    // uniform mat4 projectionMatrix;
    // uniform mat4 viewMatrix;
    // uniform mat4 modelMatrix;
    uniform vec2 u_frequency;
    uniform float u_time;
    uniform vec2 u_mouse;

    // attribute vec3 position;
   attribute float aRandom;
   //  attribute vec2 uv;

    // varying float vRandom; 
    // varying vec2 vUv;
    // varying float vElevation;
    // varying float vtime;
    // varying vec2 vMouse;
 
    // Plot a line on Y using a value between 0.0-1.0
    float plot(vec2 st, float pct){
        return  smoothstep( pct, pct, st.y) -
                smoothstep( pct + 0.06, pct+0.06, st.y);
    }

    void main()
    {        
    float pct = plot(position.xy,position.y);
    vec4 modelPosition = modelMatrix * vec4((position.x),(position.y),(position.z), 1.0);
   // modelPosition.z += sin(modelPosition.y * u_time) * 0.1;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = vec4( position, 1.0 );
   //gl_Position = projectedPosition;
    }