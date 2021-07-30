// precision mediump float;

uniform sampler2D uTexture;

uniform vec2 u_resolution;

varying float vRandom;
varying vec2 vUv;
varying float vElevation;
varying float vtime;
//varying float vMouse;

    void main()
    {
        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        float y = st.y;
        float testX = vUv.x;
        float testY = vUv.y;
        vec4 textureColor = texture2D(uTexture, vUv);
        textureColor.rgb *= vElevation * 1.0 + 0.5;
        //gl_FragColor = vec4(abs(sin(vtime*0.3)) + 0.4, 0.2, abs(sin(vtime*0.6)) + 0.5, 1.0); 
       // gl_FragColor = vec4(1.0, vMouse, 1.0, 1.0);
        gl_FragColor = vec4(abs(sin(vtime)), 0.2,  abs(sin(vtime*0.6)) + 0.5, 1.0); 
    }