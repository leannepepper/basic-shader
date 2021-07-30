    // uniform mat4 projectionMatrix;
    // uniform mat4 viewMatrix;
    // uniform mat4 modelMatrix;
    uniform vec2 u_frequency;
    uniform float u_time;
    uniform vec2 u_mouse;

    // attribute vec3 position;
   attribute float aRandom;
   //  attribute vec2 uv;

    varying float vRandom; 
    varying vec2 vUv;
    varying float vElevation;
    varying float vtime;
    varying vec2 vMouse;

    void main()
    {
         vec4 modelPosition = modelMatrix * vec4(position, 1.0);
         float elevation = sin(modelPosition.x * u_frequency.x + u_time) * 0.1;
         elevation += sin(modelPosition.y * u_frequency.y +  u_time) * 0.1;
         modelPosition.z += elevation;
         vec4 viewPosition = viewMatrix * modelPosition; 
         vec4 projectedPosition = projectionMatrix * viewPosition;

        gl_Position = projectedPosition;
       // gl_Position = vec4( position, 1.0 );
         vRandom = aRandom;
         vUv = uv;
        // vElevation = elevation;
         vtime = u_time;
        vMouse = u_mouse;
    }