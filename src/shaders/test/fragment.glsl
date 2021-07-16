// precision mediump float;

uniform sampler2D uTexture;

varying float vRandom;
varying vec2 vUv;
varying float vElevation;
varying float vtime;

    void main()
    {
        vec4 textureColor = texture2D(uTexture, vUv);
        textureColor.rgb *= vElevation * 1.0 + 0.5;
        gl_FragColor = vec4(abs(sin(vtime + vUv)), 1.0, 1.0);
    }