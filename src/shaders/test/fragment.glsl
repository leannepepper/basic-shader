//precision mediump float;

#define PI 3.14159265359

uniform vec2 u_resolution;
//uniform vec2 u_mouse;
uniform float u_time;
uniform vec3 u_color_palette[5];

float random (vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(0.01, 100.0)))*
        10000.0);
}

float noise (vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i + vec2(0.0, 0.0));
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation
    vec2 u = smoothstep(0.1,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.y * sin(0.01 * u_time));
}


void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = smoothstep(0.01, 1.0, u_color_palette[4]);

    mat2 rotation = mat2(cos(0.1), sin(0.9),
                    -sin(0.5), cos(0.90 ));

    float n = noise(vec2(st * rotation * 5.0 ));
    //(cos(u_time * 0.1) * 10.0)
	//gl_FragColor = vec4(vec3(color.r * n, color.g * n, color.b * n),1.0);
    gl_FragColor = vec4(vec3(color * n),1.0);
    
}