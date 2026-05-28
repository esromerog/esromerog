varying vec2 vUv;
// varying vec2 cloudUV;

// varying vec3 vColor;
uniform float iTime;
uniform float tip_offset;
varying vec3 cpos;
varying vec3 v_normal;
varying vec3 v_view;

#define PI 3.14159265359

float random(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vUv = uv;
    cpos = position; // A varying with the position passed to the fragment shader
    v_normal = normal;
    // vColor = color;
    
    // To store final pos
    vec3 vertPos = cpos;

    // Calculate a random tip bend based on the vertex position
    // For now it's not animated
    float randTipBend = random(cpos.xz) * PI * 2.;
    vec3 randTipDir = vec3(sin(randTipBend + iTime/500.), 0.0, cos(randTipBend + iTime/500.));
    if (cpos.y > 0.8) {
        vertPos += randTipDir * tip_offset;
    }
    
    cpos = vertPos;
    vec4 mvPosition = projectionMatrix * modelViewMatrix * vec4(vertPos, 1.);
    gl_Position = mvPosition;
}