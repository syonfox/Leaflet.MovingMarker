//https://github.com/bbecquet/Leaflet.RotatedMarker/blob/master/leaflet.rotatedMarker.js
(function () {
    // save these original methods before they are overwritten
    var proto_initIcon = L.Marker.prototype._initIcon;
    var proto_setPos = L.Marker.prototype._setPos;

    var oldIE = (L.DomUtil.TRANSFORM === 'msTransform');

    L.Marker.addInitHook(function () {
        var iconOptions = this.options.icon && this.options.icon.options;
        var iconAnchor = iconOptions && this.options.icon.options.iconAnchor;
        if (iconAnchor) {
            iconAnchor = (iconAnchor[0] + 'px ' + iconAnchor[1] + 'px');
        }
        this.options.rotationOrigin = this.options.rotationOrigin || iconAnchor || 'center bottom';
        this.options.rotationAngle = this.options.rotationAngle || 0;
        this.options.rotiatonOffset = this.options.rotiatonOffset || 0;

        // Ensure marker keeps rotated during dragging
        //maybe you want to comment this out as an optamization for manual controle
        if (!this.options.disableDragEvents) {
            this.on('drag', function (e) {
                //hope this dosent trip you out.
                requestAnimationFrame(e.target._applyRotation);
            });
        }
    });

    L.Marker.include({
        _initIcon: function () {
            proto_initIcon.call(this);
        },

        _setPos: function (pos) {
            proto_setPos.call(this, pos);
            this._applyRotation();
        },

        _applyRotation: function () {
            if (this.options.rotationAngle) {
                let theta = this.options.rotationAngle += this.options.rotiatonOffset;

                this._icon.style[L.DomUtil.TRANSFORM + 'Origin'] = this.options.rotationOrigin;

                if (oldIE) {
                    // for IE 9, use the 2D rotation
                    this._icon.style[L.DomUtil.TRANSFORM] = 'rotate(' + theta + 'deg)';
                } else {
                    // for modern browsers, prefer the 3D accelerated version
                    this._icon.style[L.DomUtil.TRANSFORM] += ' rotateZ(' + theta + 'deg)';
                }
            }
        },

        setRotationAngle: function (angle) {
            this.options.rotationAngle = angle;
            this.update();
            return this;
        },

        setRotationOrigin: function (origin) {
            this.options.rotationOrigin = origin;
            this.update();
            return this;
        }
    });


/**
 * Calculates the intermediate position between two points at a given time.
 *
 * @param {L.LatLng} p1 - The starting point.
 * @param {L.LatLng} p2 - The ending point.
 * @param {number} duration - The total duration of the animation.
 * @param {number} t - The current time of the animation.
 * @returns {L.LatLng} The intermediate position.
 *
 * @example
 *
 * // Calculate the position halfway between two points after one second of animation
 * var p1 = L.latLng(0, 0);
 * var p2 = L.latLng(10, 10);
 * var position = L.interpolatePosition(p1, p2, 2, 1);
 * console.log(position); // LatLng {lat: 5, lng: 5}
 */
L.interpolatePosition = function (p1, p2, duration, t) {
    let k = t / duration;
    k = (k > 0) ? k : 0;
    k = (k > 1) ? 1 : k;
    return L.latLng(p1.lat + k * (p2.lat - p1.lat), p1.lng + k * (p2.lng - p1.lng));
};


/**
 * Calculates the intermediate angle between two angles at a given time liniarly.
 * always takes the shortes path
 * @param {number} a1 - The starting angle (in degrees).
 * @param {number} a2 - The ending angle (in degrees).
 * @param {number} duration - The total duration of the animation.
 * @param {number} t - The current time of the animation.
 * @returns {number} The intermediate angle (in degrees).
 *
 * @example
 * // Calculate the angle halfway between two angles after one second of animation
 * var a1 = 0;
 * var a2 = 180;
 * var angle = L.interpolateAngle(a1, a2, 2, 1);
 * console.log(angle); // 90
 */
L.interpolateAngle = function (a1, a2, duration, t) {
    var k = t / duration;
    k = (k > 0) ? k : 0;
    k = (k > 1) ? 1 : k;

    var diff = a2 - a1;
    if (Math.abs(diff) > 180) {
        diff = diff - Math.sign(diff) * 360;
    }

    var angle = Math.floor(a1 + diff * k);

    if (angle < 0) {
        angle += 360;
    }
    if (angle >= 360) {
        angle -= 360;
    }

    return angle;
};


/**
 * Interpolates an angle between two values using the specified easing function.
 *
 * @param {number} a1 - The starting angle, in degrees.
 * @param {number} a2 - The ending angle, in degrees.
 * @param {number} duration - The duration of the interpolation, in milliseconds.
 * @param {number} t - The elapsed time since the start of the interpolation, in milliseconds.
 * @param {string} [easing='linear'] - The easing function to use ('linear', 'ease-in', 'ease-out', or 'ease-in-out').
 * @param {number} [exp=4] - The exponential factor to use for the ease-in and ease-out functions (higher values create steeper curves).
 * @param {number} [offset=0] - An optional offset to add to the interpolated angle.
 * @returns {number} - The interpolated angle, in degrees.
 */
// L.interpolateAngle = function (a1, a2, duration, elapsed, equation, exp, offset) {
//     var diff = a2 - a1;
//
//     // Ensure the angle difference is within one rotation
//     if (diff > 180) {
//         a2 -= 360;
//         diff = a2 - a1;
//     } else if (diff < -180) {
//         a2 += 360;
//         diff = a2 - a1;
//     }
//
//     var k = elapsed / duration;
//     k = (k > 0) ? k : 0;
//     k = (k > 1) ? 1 : k;
//
//     // Apply the chosen interpolation equation
//     switch (equation) {
//         case 'linear':
//             angle = Math.floor(diff * k + a1);
//             break;
//         case 'ease-in':
//             angle = Math.floor(diff * Math.pow(k, exp) + a1);
//             break;
//         case 'ease-out':
//             angle = Math.floor(diff * (1 - Math.pow(1 - k, exp)) + a1);
//             break;
//         case 'ease-in-out':
//             if (k < 0.5) {
//                 angle = Math.floor(diff * 2 * Math.pow(k, exp) + a1);
//             } else {
//                 angle = Math.floor(diff * (1 - Math.pow(-2 * k + 2, exp) / 2) + a1);
//             }
//             break;
//         default:
//             throw new Error('Invalid interpolation equation');
//     }
//
//     // Apply the optional offset
//     if (offset) {
//         angle = (angle + offset) % 360;
//     }
//
//     return angle;
// };

/**
 * Calculates the angle between two points (in degrees) relative to the x-axis.
 *
 * @param {number} cx - The x-coordinate of the first point.
 * @param {number} cy - The y-coordinate of the first point.
 * @param {number} ex - The x-coordinate of the second point.
 * @param {number} ey - The y-coordinate of the second point.
 * @returns {number} The angle between the two points (in degrees).
 *
 * @example
 *
 * // Calculate the angle between two points
 * var angle = L.getAngle(0, 0, 10, 10);
 * console.log(angle); // 45
 */
L.getAngle = function (cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    // if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;

};
    /**
     * Creates a new MovingMarker object which extends L.Marker. It animates the movement of the marker
     * along a given set of coordinates with a corresponding set of durations between each coordinate.
     * @constructor
     * @param {L.LatLng[]} latlngs - An array of LatLng objects representing the path that the marker should follow.
     * @param {number[]} durations - An array of durations (in milliseconds) representing the time that the marker should take to move from one coordinate to the next.
     *  Note durations is theoretically an n-1 array with n being the length of the LineString  p1-p2-p3-p4 etc
     * @param {Object} [options] - An optional object with options for the MovingMarker object.
     * @param {boolean} [options.autostart=false] - Whether to start the animation automatically after the object is created.
     * @param {boolean} [options.loop=false] - Whether to loop the animation back to the start after reaching the end. Note that for a smooth loop, the last coordinate in the path should be the same as the first coordinate.
     * @param {boolean} [options.debug=false] - Whether to enable debugging information.
     * @param {boolean} [options.center=false] - true, "pan", "lock" Whether to center the map view on the marker while it moves.
     * @param {boolean} [options.bound=false] - Whether to fit the map view to the marker bounds while it moves.
     * @param {boolean} [options.zoompause=false] - EXPAREMENTAL Whether to pause the animation when the map view is zoomed.
     * @param {boolean} [options.rotate=true] - Whether to rotate the marker in the direction of movement.
     * @param {(number|boolean)} [options.smoothrotate=true] - Whether to smoothly interpolate the rotation between coordinates. If a number is provided, it will be used as the proportion of the path to use as a buffer for rotation interpolation. If `true`, a default buffer of 10% on either side of the endpoint will be used.
     * false = simple fast rotate; 0-1 = percentage of length; 1+ = number of ms
     * @param {number} [options.initialRotationOffset=0] - The initial rotation offset of the marker in degrees.
     */
    L.Marker.MovingMarker = L.Marker.extend({

        //state constants
        statics: {
            notStartedState: 0,
            endedState: 1,
            pausedState: 2,
            runState: 3
        },

        options: {
            autostart: false,
            loop: false, // not for a smooth loop the lat point must == first point otherwise it will jump back to start
            debug: false,
            center: false,
            bound: false,
            zoompause: false,
            rotate: true,
            smoothrotate: true, // wether to interpolate the rotation graduly (accepts a num less then 1 for proprtion of path)
            // or a larger number for a distance from each endpoint. true = 0.1 or 10% on ether side
            //thse options are used for the rotaion interpolations
            initialRotationOffset: 0,
            // rotationOrigin: "bottom center", // dont override the other defaults
            //rotationOffset: "a number to be applied in RotationMarker"
            // rotationEasing: "linear", //L.interpolatAngle
            // rotationExp: 2,


        },

        initialize: function (latlngs, durations, options) {
            L.Marker.prototype.initialize.call(this, latlngs[0], options);

            this._latlngs = latlngs.map(function (e, index) {
                return L.latLng(e);
            });

            this._durations = durations;
            this._currentDuration = 0;
            this._currentIndex = 0;
            this._currentLine = [];

            this._state = L.Marker.MovingMarker.notStartedState;
            this._startTime = 0;
            this._startTimeStamp = 0;
            this._pauseStartTime = 0;
            this._animId = 0;
            this._animRequested = false;

            if (this.options.smoothrotate) {
                if (!this.options.rotate) {
                    this.options.rotate = true;
                }
                if (typeof this.options.smoothrotate === "number") {
                    this._rotateBuffer = this.options.smoothrotate
                } else {
                    this._rotateBuffer = 0.1;
                }
            }
            // if(this.options.initialRotationOffset) {
            //     this.setRotationAngle(this.options.initialRotationOffset)
            // }

        },

        /**
         * @returns {boolean}
         */
        isRunning: function () {
            return this._state === L.Marker.MovingMarker.runState;
        },

        /**
         * @returns {boolean}
         */
        isEnded: function () {
            return this._state === L.Marker.MovingMarker.endedState;
        },

        /**
         * from begining
         * @returns {boolean}
         */
        isStarted: function () {
            return this._state !== L.Marker.MovingMarker.notStartedState;
        },

        /**
         * pause can only be resume() or start()
         * @returns {boolean}
         */
        isPaused: function () {
            return this._state === L.Marker.MovingMarker.pausedState;
        },

        /**
         * Starts the moving marker animation.
         * If the marker is already running, it does nothing.
         * If the marker is paused, it resumes from the paused state.
         * If the marker is not running or paused, it starts from the first point.
         * @function
         * @returns {void}
         */
        start: function () {
            if (this.isRunning()) {
                return;
            }

            if (this.isPaused()) {
                this.resume();
            } else {
                this._loadLine(0);
                this._startAnimation();

                this._initalStartTime = Date.now();
                this.fire('start', {startTime: this._initalStartTime});
            }

        },

        /**
         * Resumes the marker animation from the paused state.
         * If the marker is not paused, it does nothing.
         * @function
         * @returns {void}
         */
        resume: function () {
            if (!this.isPaused()) {
                return;
            }
            // update the current line
            this._currentLine[0] = this.getLatLng();
            this._currentDuration -= (this._pauseStartTime - this._startTime);
            this._startAnimation();
        },

        /**
         * Adds a new point to the end of the moving marker's path.
         * @function
         * @param {L.LatLng} latlng - The latitude and longitude of the new point.
         * @param {number} duration - The time, in milliseconds, to travel from the previous point to the new point.
         * @returns {void}
         */
        addLatLng: function (latlng, duration) {
            this._latlngs.push(L.latLng(latlng));
            this._durations.push(duration);
        },

        /**
         * Moves the marker to a new position and starts the animation.
         * If the marker is already running or paused, it stops before moving to the new position.
         * @function
         * @param {L.LatLng} latlng - The latitude and longitude of the new position.
         * @param {number} duration - The time, in milliseconds, to travel from the current position to the new position.
         * @returns {void}
         */
        moveTo: function (latlng, duration) {
            this._stopAnimation();
            this._latlngs = [this.getLatLng(), L.latLng(latlng)];
            this._durations = [duration];
            this._state = L.Marker.MovingMarker.notStartedState;
            if (this.options.debug) console.log("Moving Marker To:  ", latlng);
            this.start();
            this.options.loop = false;
        },

        addStation: function (pointIndex, duration) {
            if (pointIndex > this._latlngs.length - 2 || pointIndex < 1) {
                return;
            }
            var t = this._latlngs[pointIndex];
            this._latlngs.splice(pointIndex + 1, 0, t);
            this._durations.splice(pointIndex, 0, duration);
        },

        /**
         * Starts the animation of the moving marker.
         * @private
         */
        _startAnimation: function () {
            this._startTime = Date.now();
            this._state = L.Marker.MovingMarker.runState;
            this._animId = L.Util.requestAnimFrame(function (timestamp) {
                this._startTimeStamp = timestamp;
                this._animate(timestamp);
            }, this, true);
            this._animRequested = true;
        },

        /**
         * Resumes the animation of the moving marker.
         * @private
         */
        _resumeAnimation: function () {
            if (!this._animRequested) {
                this._animId = L.Util.requestAnimFrame(function (timestamp) {
                    this._animate(timestamp);
                }, this, true);
            }
        },

        /**
         * Stops the animation of the moving marker.
         * @private
         */
        _stopAnimation: function () {
            if (this._animRequested) {
                L.Util.cancelAnimFrame(this._animId);
                this._animRequested = false;
            }
        },

        _computeRotaionData: function (index) {
            //we need to find the start rotain and end rotation
            let p, c, n // prev curent next indexes
            if (index == 0) {
                if (this.options.loop) {
                    p = this._latlngs.length;
                    c = 0
                    n = 1
                } else {
                    p = 0;
                    c = 0;
                    n = 1;
                }
            } else if (index == this._latlngs.length) {
                if (this.options.loop) {
                    p = index - 1;
                    c = index
                    n = 0
                } else {
                    p = index - 1;
                    c = index;
                    n = index;
                }
            } else {
                //in the middel
                p = index - 1;
                c = index
                n = index + 1;
            }
            this._setAngles(p, c, n);
        },

        _lineToAngle: function (line) {
            return L.getAngle(
                line[0].lat,
                line[0].lng,
                line[1].lat,
                line[1].lng
            );
        },

        //sets the rotation information for the animation based on
        //previos current and next indexes todo roling optimization.
        // intialy compute it all
        _setAngles: function (p, c, n) {//prev, cur, next
            //a helper for setin the data needed for the begining and end of an rotation animation
            let dp = this._durations[p];
            let dc = this._durations[c];
            let dn = this._durations[n];


            //theorectical curent is only called with n-1 so this wont triger?
            //unless loop then it could be the last point


            let lc = this._currentLine; // from _loadLine
            let lp, ln;

            if (p == c) { //no loop start point at start
                lp = lc; //
            } else {
                lp = [this._latlngs[p], this._latlngs[c]]
            }

            if (c == n) { // no loop end point to end
                ln = lc;
            } else {
                //wrap if needed
                let nn = (n + 1) % this._latlngs.length
                ln = [this._latlngs[n], this._latlngs[nn]]
            }


            let ap = this._lineToAngle(lp);
            let ac = this._lineToAngle(lc);
            let an = this._lineToAngle(ln);

            let buf = this._rotateBuffer;
            let bp, bc, bn
            if (buf < 1) { // in the mod use a percent of the duration
                bp = dp * buf;
                bc = dc * buf;
                bn = dn * buf;

            } else { // otherwise a fixed time in ms i think
                bp = buf;
                bc = buf;
                bn = buf;
            }

            //Clam the animations to the whol length of both lines
            bp = Math.min(dp, bp);
            bc = Math.min(dc, bc);
            bn = Math.min(dn, bn);

            this._rotateData = {
                p: {index: p, duration: dp, angle: ap, buf: bp, line: lp},
                c: {index: c, duration: dc, angle: ac, buf: bc, line: lc},
                n: {index: n, duration: dn, angle: an, buf: bn, line: ln}
            }

        },

        /**
         * Loads the line segment at the given index to be animated next.
         * @param {number} index - The index of the starting point of the line segment to load.
         * @private
         */
        _loadLine: function (index) {
            if (index > this._latlngs - 2) {
                console.error("You canot load a line past the last segment [[len-2], [len-1]]")
            }
            this._currentIndex = index;
            this._currentDuration = this._durations[index];
            this._currentLine = this._latlngs.slice(index, index + 2);


            if (this.options.rotate) {
                // // set direction simply
                if (!this.options.smoothrotate) {
                    let a = this._lineToAngle(this._currentLine)
                    //if smooth rotate is on it will apply rotations
                    this._setAngle(a);
                } else {
                    this._computeRotaionData(index);
                }

            }

        },

        /**
         * Internal method to set the RotationMarker Angle
         * see the above global Marker Injection.
         * @param a - angle in degrees
         * @private
         */
        _setAngle: function (a) {
            let old = this._currentAngle
            if (old == a) return;
            this._currentAngle = a;
            this.fire("rotate", {angle: a, old});
            // this.options.rotationAngle = a;
            // this._applyRotation();
            // requestAnimationFrame(this._applyRotation);

            this.setRotationAngle(a);
        },

        /**
         * Load the line where the marker is
         * @param  {Number} timestamp
         * @return {Number} elapsed time on the current line or null if
         * we reached the end or marker is at a station
         */
        _updateLine: function (timestamp) {
            //time elapsed since the last latlng
            var elapsedTime = timestamp - this._startTimeStamp;
            // if(this.options.debug) console.log("Update Line ",lineIndex);

            // not enough time to update the line
            if (elapsedTime <= this._currentDuration) {
                //we know were not done
                return elapsedTime;
            }


            var lineIndex = this._currentIndex;
            var lineDuration = this._currentDuration;

            while (elapsedTime > lineDuration) {
                //substract time of the current line
                elapsedTime -= lineDuration;
                lineIndex++;

                // test if we have reached the end of the polyline
                if (lineIndex >= this._latlngs.length - 1) {

                    if (this.options.loop) {
                        lineIndex = 0;
                        this.fire('loop', {elapsedTime: elapsedTime});
                    } else {
                        // place the marker at the end, else it would be at
                        // the last position
                        this.setLatLng(this._latlngs[this._latlngs.length - 1]);
                        this.stop(elapsedTime);
                        return null;
                    }
                }
                lineDuration = this._durations[lineIndex];
            }

            if (this.options.debug) console.log("Next Step ", lineIndex);
            this.fire('station', {lineIndex, elapsedTime})
            this._loadLine(lineIndex);
            this._startTimeStamp = timestamp - elapsedTime;
            this._startTime = Date.now() - elapsedTime;
            return elapsedTime;
        },

        /**
         * Update Dom the logic of a rotation update based on elapsed time
         * @param dt
         * @private
         */
        _updateRotation: function (dt) {

            // console.log(dt, Date.now() - this._startTime, this._currentDuration);
            let buf = this._rotateBuffer;

            let rd = this._rotateData;
            if (!rd) {
                console.error("No rotation data please precompute this before updating");
                return;
            }

            let angle
            if (dt < rd.c.buf) {
                let a, b, len, pos;
                //at start finish previous turn
                a = rd.p.angle;
                b = rd.c.angle;
                len = rd.p.buf + rd.c.buf;
                pos = rd.p.buf + dt;
                angle = L.interpolateAngle(a, b, len, pos, this.options.rotationEasing, this.options.rotationExp);
            } else if (dt > rd.c.duration - rd.c.buf) {
                //at end start turn
                let a, b, len, pos;
                a = rd.c.angle;
                b = rd.n.angle;
                len = rd.c.buf + rd.n.buf;
                pos = rd.c.buf - (rd.c.duration - dt);
                angle = L.interpolateAngle(a, b, len, pos, this.options.rotationEasing, this.options.rotationExp);
            } else {
                angle = rd.c.angle
            }

            // console.log("New angle is", angle);
            this._setAngle(angle);
            //done we are now rotated

        },

        _rotationSkip: 5,
        _rotationSkipCount: 5,//start on first frame
        _animate: function (timestamp, noRequestAnim) {
            // compute the time elapsed since the start of the line
            var elapsedTime;
            this._animRequested = false;

            //find the next line and compute the new elapsedTime
            elapsedTime = this._updateLine(timestamp);

            if (elapsedTime === null) {
                //we have reached the end
                return;
            }
            if (this.options.debug) console.log()
            // compute the position
            var p = L.interpolatePosition(this._currentLine[0],
                this._currentLine[1],
                this._currentDuration,
                elapsedTime);

            if (this.options.debug) console.log("Set Lat Lon");

            this._rotationSkipCount++;
            //this is a small optimisation to only calculate every 5th frame
            if (this.options.smoothrotate && this._rotationSkipCount > this._rotationSkip) {
                this._rotationSkipCount = 0;
                this._updateRotation(elapsedTime);
            }

            this.fire('step', {elapsedTime})//

            if (this.options.center && marker._popup.isOpen()) {
                if (this.options.center === 'lock') {
                    this._map.setView(p, undefined, {
                        animate: false,
                        noMoveStart: true,
                        // animate:true,
                        // easeLinearity: 0,
                        // duration:elapsedTime,
                        // noMoveStart: true
                    })
                    // marker.update();
                } else if (this.options.center === 'pan') {
                    this._map.panTo(p, {
                        animate: true,
                        easeLinearity: 1,
                        duration: elapsedTime,
                        noMoveStart: true
                    })


                } else if (this.options.center === 'pan') {
                    this._map.panTo(p, {
                        animate: true,
                        easeLinearity: 1,
                        duration: elapsedTime,
                        noMoveStart: true
                    })


                } else {
                    let zoom = map.getZoom();
                    this._map.setView(p, map.getZoom(), {
                        animate: true,
                        easeLinearity: Math.min(1, 15 / zoom),
                        duration: 1 / zoom,
                        noMoveStart: true
                    })
                }
            }

            this.setLatLng(p);
            if (!noRequestAnim) { // smart by using this, when the object dies it stops :)
                if (this.options.debug) console.log("Requesting animation elapsed: ", elapsedTime);
                this._animId = L.Util.requestAnimFrame(this._animate, this, false);
                this._animRequested = true;
            }
        },

        /**
         * In leaflet extentions this is what gets called when we are added to the map
         * @param map
         */
        onAdd: function (map) {
            L.Marker.prototype.onAdd.call(this, map);

            if (this.options.zoompause) {
                console.log("pasusase")
                let self = this;
                map.on("zoomstart", function () {
                    console.log("pasue")
                    self.pause();
                });
                map.on("zoomend", function () {
                    self.resume();
                });
                document.addEventListener("visibilitychange", function () {
                    if (document.hidden) {
                        console.log("pasue")

                        self.pause();
                    } else {
                        self.resume();
                    }
                }, false);
            }

            if (this.options.autostart && (!this.isStarted())) {
                this.start();
                return;
            }

            if (this.isRunning()) {
                this._resumeAnimation();
            }
        },

        /**
         * And clean up yo emss when we are removed
         * @param map
         */
        onRemove: function (map) {
            L.Marker.prototype.onRemove.call(this, map);
            this._stopAnimation();
        },


        /**
         *     temporarily stop the animation where it is
         */
        pause: function () {
            if (!this.isRunning()) {
                return;
            }

            this._pauseStartTime = Date.now();
            this._state = L.Marker.MovingMarker.pausedState;
            this._stopAnimation();
            //force animation to place the marker at the right place
            this._animate(this._startTimeStamp
                + (this._pauseStartTime - this._startTime), true);
        },

        /**
         *  permanently stop until restart
         *  @param elapsedTime - if left blank anamates last step for user call
         */
        stop: function (elapsedTime) {
            if (this.isEnded()) {
                return;
            }

            this._stopAnimation();

            if (typeof (elapsedTime) === 'undefined') {
                //user call
                elapsedTime = 0;
                // force animation to place the marker at the right place
                this._animate(this._startTimeStamp
                    + (Date.now() - this._startTime), true);
            }

            this._state = L.Marker.MovingMarker.endedState;
            this.fire('end', {elapsedTime: elapsedTime});
        }
    });

L.Marker.movingMarker = function (latlngs, duration, options) {
    return new L.Marker.MovingMarker(latlngs, duration, options);
};


/**
 * Creates a moving marker on a Leaflet map with a polyline and popup, and supports
 * a single velocity value or an array of durations. Also includes callbacks for
 * onStep, onStation, and onDone events.
 *
 * @param {L.Map} map - The Leaflet map to add the moving marker to
 * @param {L.LatLng[]} latlngs - An array of LatLng objects representing the path
 * @param {number | number[]} velocity - The velocity in meters per second, or an
 *   array of durations in milliseconds
 * @param {Object} options - The options object for L.Marker.movingMarker
 * @param {string} popupText - The text to display in the marker's popup
 // * @param {function} initPopup - A function called whenever the dom is showen to attach listeners etc.
 * @param {function} onStep - A callback function to execute on each step of the marker
 * @param {function} onStation - A callback function to execute on each station of the marker
 * @param {function} onDone - A callback function to execute when the marker reaches the end of the path
 * @returns {L.Marker} The moving marker object
 */
L.Marker.createMovingMarker = function (map, latlngs, velocity, options, popupText, onStep, onStation, onDone) {

    /**
     * Calculates an array of durations based on a given velocity and an array of LatLng objects.
     *
     * @param {L.LatLng[]} latlngs - An array of LatLng objects representing the path
     * @param {number} velocity - The velocity in meters per second
     * @returns {number[]} An array of durations in milliseconds
     */
    function calculateDurations(latlngs, velocity) {
        let distances = [];
        let totalDistance = 0;
        // Calculate the distances between each LatLng object and the total distance
        for (let i = 0; i < latlngs.length - 1; i++) {
            let distance = latlngs[i].distanceTo(latlngs[i + 1]);
            distances.push(distance);
            totalDistance += distance;
        }
        // Calculate the duration for each distance based on the velocity
        let durations = distances.map((distance) => distance / velocity * 1000);
        // Return the durations array
        return durations;
    }


    // Convert velocity to durations if necessary
    let durations = Array.isArray(velocity) ? velocity : calculateDurations(latlngs, velocity);
    // Create the moving marker with given latlngs and durations
    let marker = L.Marker.movingMarker(latlngs, durations, options).addTo(map);
    // Add a polyline with given latlngs and color to the map
    L.polyline(latlngs, {color: 'red'}).addTo(map);
    // Bind a popup to the marker with given text
    marker.bindPopup(popupText, {closeOnClick: false}).openPopup();
    // Add callbacks to the marker
    // if(initPopup) { // idk why this doesnt work here use old hack :)
    //     marker.on('popupopen', function (event) {
    //         initPopup(marker);
    //     });
    // }

    if (onStep) {
        marker.on('step', function (event) {
            onStep(marker, event.elapsedTime, marker._latlng, marker._popup, event);
        });
    }
    if (onStation) {
        marker.on('station', function (event) {
            onStation(marker, event.elapsedTime, marker._latlng, marker._popup, event);
        });
    }
    if (onDone) {
        marker.on('end', function (event) {
            onDone(marker, event.elapsedTime, event.latlng, event.target._popup);
        });
    }
    // Return the marker object
    return marker;
}

})();

// bs.prompt("Run Pig Estamation", {
//     velocity: {type: "input", inputType: "number"},
//     start: {type: 'datepicker'},
//     coolline: "input",
//     startPoint: {
//         type: 'draw',
//         featureType: 'point'
//     }
//
// }, {}, {})