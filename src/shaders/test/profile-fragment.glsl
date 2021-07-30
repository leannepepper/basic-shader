// precision mediump float;

uniform sampler2D uTexture;

uniform vec2 u_resolution;

varying float vRandom;
varying vec2 vUv;
varying float vElevation;
varying float vtime;
varying vec2 vMouse;

    void main()
    {
    float mouseY = vMouse.y;

    float strength = 0.25 / (distance(vec2(vUv.x, (vUv.y - 0.5) * 10.0 + 0.5), vec2(0.5, (sin(vtime + 0.5) * 0.05) + 0.5) ));
    strength *= 0.05 / (distance(vec2(vUv.y, (vUv.x - 0.5) * 15.0 + 0.5), vec2(0.5, (cos(vtime + 0.5) * 0.05) + 0.5 )));

    gl_FragColor = vec4(vec3(strength), 1.0);
    }