L.interpolatePosition = function (p1, p2, duration, t) {
    var k = t / duration;
    k = (k > 0) ? k : 0;
    k = (k > 1) ? 1 : k;
    return L.latLng(p1.lat + k * (p2.lat - p1.lat),
        p1.lng + k * (p2.lng - p1.lng));
};

L.getAngle = function (cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    // if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
};

L.Marker.MovingMarkerMin = L.Marker.extend({
    options: {
        rotate: false,
        initialRotationAngle: 0,
        rotationOrigin: "center",
    },

    now: function () {
        return Date.now();
    },

    initialize: function (latlngs, durations, options, cbmove, cbresetpos) {

        this.cbmove = cbmove;
        this.cbresetpos = cbresetpos;

        L.Marker.prototype.initialize.call(this, latlngs[0], options);

        this._latlngs = latlngs.map(function (e, index) {
            return L.latLng(e);
        });

        if (durations instanceof Array) {
            this._durations = durations;
        } else {
            this._durations = this._createDurations(this._latlngs, durations);
        }

        this._currentDuration = 0;
        this._currentIndex = 0;
        this._currentLine = [];
    },

    setcurpos: function (val) {
        var totaltime = 0;
        for (const it of this._durations) {
            totaltime += it;
        }
        var elapsedTime = totaltime * val;

        this._loadLine(0);

        // callback: reset
        if (this.cbresetpos) {
            this.cbresetpos();
        }

        // callback: move to start
        if (this.cbmove && this._latlngs.length) {
            this.cbmove(this._latlngs[0]);
        }

        // update line & move position
        // find the next line and compute the new elapsedTime
        var elapsedTime = this._updateLine(elapsedTime);

        if (elapsedTime != null) {
            // compute the position
            var p = L.interpolatePosition(this._currentLine[0],
                this._currentLine[1],
                this._currentDuration,
                elapsedTime);
            this._setLatLngWithCb(p);
        }
    },


    addLatLng: function (latlng, duration) {
        this._latlngs.push(L.latLng(latlng));
        this._durations.push(duration);
    },


    _createDurations: function (latlngs, duration) {
        var lastIndex = latlngs.length - 1;
        var distances = [];
        var totalDistance = 0;
        var distance = 0;

        // compute array of distances between points
        for (var i = 0; i < lastIndex; i++) {
            distance = latlngs[i + 1].distanceTo(latlngs[i]);
            distances.push(distance);
            totalDistance += distance;
        }

        var ratioDuration = duration / totalDistance;

        var durations = [];
        for (i = 0; i < distances.length; i++) {
            durations.push(distances[i] * ratioDuration);
        }

        return durations;
    },

    _updateRotation: function () {
        if (this._rotationAngle) {
            this._icon.style[
                L.DomUtil.TRANSFORM + "Origin"
            ] = this.options.rotationOrigin;

            this._icon.style[L.DomUtil.TRANSFORM] +=
                " rotateZ(" +
                (this.options.initialRotationAngle + this._rotationAngle) +
                "deg)";
        }
    },

    _loadLine: function (index) {
        this._currentIndex = index;
        this._currentDuration = this._durations[index];
        this._currentLine = this._latlngs.slice(index, index + 2);

        if (this.options.rotate) {
            // set direction
            this._rotationAngle = L.getAngle(
                this._currentLine[0].lat,
                this._currentLine[0].lng,
                this._currentLine[1].lat,
                this._currentLine[1].lng
            );
        }
    },

    /**
     * Load the line where the marker is
     * @param  {Number} timestamp
     * @return {Number} elapsed time on the current line or null if
     * we reached the end or marker is at a station
     */
    _updateLine: function (elapsedTime) {
        // time elapsed since the last latlng

        // not enough time to update the line
        if (elapsedTime <= this._currentDuration) {
            return elapsedTime;
        }

        var lineIndex = this._currentIndex;
        var lineDuration = this._currentDuration;

        while (elapsedTime > lineDuration) {
            // substract time of the current line
            elapsedTime -= lineDuration;

            lineIndex++;

            // key point
            if (this.cbmove) {
                this.cbmove(this._latlngs[lineIndex])
            }

            // test if we have reached the end of the polyline
            if (lineIndex >= this._latlngs.length - 1) {
                this._setLatLngWithCb(this._latlngs[this._latlngs.length - 1]);
                return null;
            }

            lineDuration = this._durations[lineIndex];
        }

        this._loadLine(lineIndex);
        return elapsedTime;
    },

    _setLatLngWithCb: function (p) {
        this.setLatLng(p);
        if (this.options.rotate) {
            this._updateRotation();
        }
        if (this.cbmove) {
            this.cbmove(p)
        }
    },

});

L.Marker.movingMarkerMin = function (latlngs, duration, options, cbmove, cbresetpos) {
    return new L.Marker.MovingMarkerMin(latlngs, duration, options, cbmove, cbresetpos);
};



// this._animId = L.Util.requestAnimFrame(() => {
//     this._animate();
// }, this, false);

// L.Util.cancelAnimFrame(this._animId);