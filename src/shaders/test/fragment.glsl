// precision mediump float;

uniform sampler2D uTexture;
uniform float uMouse;

varying float vRandom;
varying vec2 vUv;
varying float vElevation;
varying float vtime;
varying float vMouse;

    void main()
    {
        vec4 textureColor = texture2D(uTexture, vUv);
        textureColor.rgb *= vElevation * 1.0 + 0.5;
       // gl_FragColor = vec4(1.0, abs(sin(vtime + vUv)), 1.0);
       // vec2 st = uMouse.xy;
       //vec2 sty = gl_FragCoord.y/uMouse;
        gl_FragColor = vec4(1.0, vMouse, 1.0, 1.0);
    }