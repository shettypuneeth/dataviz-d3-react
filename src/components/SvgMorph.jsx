import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { interpolateString } from 'd3-interpolate';
import { easeCircleOut } from 'd3-ease';
import { timer } from 'd3-timer';

import Title from './Title';

class SvgMorph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePath: this.props.originalValue
    };

    this.now = 0;
    this.startTime = 0;
    this.lastTime = 0;

    this.defaultPreferences = {
      duration: 1000,
      autoplay: true,
      loop: true
    }

    this.defaultTweenSettings = {
      duration: 1000,
      delay: 0,
      easing: 'easeCubicOut',
      elasticity: 500,
      round: 0
    }

    this.settings = this._getSettings();
  }
  
  componentDidMount() {
    if (this.settings.autoplay) {
      this._play();
    }
  }

  _replaceObjectProps(o1, o2) {
    let o = {
      ...o1
    };
    for (let p in o1) o[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p];
    return o;
  }

  _getTweenSettigs = (params) => {
    return this._replaceObjectProps(this.defaultTweenSettings, params);
  }

  _normalizePropertyTweens(prop, tweenSettings) {
    let settings = {
      ...tweenSettings
    };
    const l = prop.length;
    settings.duration = tweenSettings.duration / l;

    return prop.map((v, i) => {
      // Use path object as a tween value
      let obj = {
        ...settings,
        value: v
      };
      // Set default delay value
      return obj;
    });
  }

  _normalizeTweens = (prop) => {
    let previousTween;
    return prop.tweens.map(t => {
      let tween = t;
      const tweenValue = tween.value;
      const previousValue = previousTween ? previousTween.to : this.props.originalValue;
      const from = previousValue;
      const to = tweenValue;
      tween.from = from;
      tween.to = to;
      tween.start = previousTween ? previousTween.end : 0;
      tween.end = tween.start + tween.duration;
      previousTween = tween;
      return tween;
    });
  }

  _createAnimation(prop) {
    const tweens = this._normalizeTweens(prop);
    return {
      tweens,
      duration: tweens[tweens.length - 1].end,
      delay: tweens[0].delay
    }
  }

  _getAnimationProperties(instanceSettings, tweenSettings, params) {
    return {
      name: 'd',
      tweens: this._normalizePropertyTweens(params['d'], tweenSettings)
    };
  }

  _getAnimations(properties) {
    return this._createAnimation(properties);
  }

  _getInstanceSettings(params) {
    return this._replaceObjectProps(this.defaultPreferences, params);
  }

  // return the animation settigs
  _getSettings = () => {
    const instanceSetttings = this._getInstanceSettings(this.props);
    const tweenSettings = this._getTweenSettigs(this.props);
    const animationProperties = this._getAnimationProperties(instanceSetttings, tweenSettings, this.props);
    const animation = this._getAnimations(animationProperties);

    return {
      ...instanceSetttings,
      animation,
      duration: this.props.duration,
      originalValue: this.props.originalValue
    }
  }

  _tick = (t) => {
    this.now = t;
    if (!this.startTime) this.startTime = this.now;

    const engineTime = (this.lastTime + this.now - this.startTime);
    this._setProgress(engineTime);
  }

  _minMaxValue(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  _play = () => {
    this.lastTime = 0; // may need adjustTime
    this._startAnimation();
  }

  _setAnimationProgress = (time) => {
    const { animation } = this.settings;
    
    if (animation) {
      const { tweens } = animation;

      const tweenLength = tweens.length - 1;
      let tween = tweens[tweenLength];
      if (tweenLength) tween = tweens.filter(t => (time < t.end))[0] || tween;
      const elapsed = this._minMaxValue(time - tween.start, 0, tween.duration) / tween.duration;
      const eased = isNaN(elapsed) ? 1 : easeCircleOut(elapsed);

      const from = tween.from;
      const to = tween.to;
      const interpolater = interpolateString(from, to);
      const progress = interpolater(eased);

      this.setState({ activePath: progress });
    }

    this.currentTime = time;
  }

  _setProgress = (engineTime) => {
    const { duration } = this.settings;

    const start =  0;
    const time = engineTime;

    if (time < duration) {
      this._setAnimationProgress(time);
    } else {
      if (time >= duration && this.currentTime !== duration) {
        this._setAnimationProgress(duration);
      }
    }

    if (engineTime > duration) {
      this.startTime = this.now;
      this.lastTime = 0; // used if we want to reverse the animation
    }
  }

  _startAnimation = () => {
    this.timer = timer(elapsed => {
      // conditions for termination ?
      this._tick(elapsed);
    });
  }
  
  render() {
    return (
      <div>
        <Title 
          title='SVG path interpolation using d3-interpolate and eased using d3-ease'
        />
        <svg 
          id='morpheus'
          className="svg-scene"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          viewBox="0 0 1440 800"
        >
          <path
            d={this.state.activePath}
          />
       </svg>
      </div>
    );
  }
}

export default SvgMorph;