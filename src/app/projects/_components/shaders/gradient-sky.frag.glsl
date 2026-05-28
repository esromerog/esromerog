precision mediump float;

uniform vec2 iResolution;
uniform float iTime;
// From the book of shaders random
// https://thebookofshaders.com/10/
float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}


void main () {
    vec2 res = iResolution.xy;
    vec2 st = gl_FragCoord.xy/res.xy;
    st.x *= res.x / res.y;
    
    // st *= 10.0; // Scale the coordinate system by 10
    vec2 ipos = floor(st*res.y);  // get the integer coords
    vec3 beige = vec3(1, 0.9, 0.83);
    vec3 coral = vec3(0.96, 0.78, 0.86);
    vec3 liliac = vec3(0.74, 0.76, 0.89);
    
    float y = gl_FragCoord.y;
    
    float noiseVal = random(ipos)*2.0-1.0;
    float noiseIntensity = 0.2;
    
    // Inspired by
    // https://stackoverflow.com/questions/15935117/how-to-create-multiple-stop-gradient-fragment-shader
    vec3 color = mix(beige, coral, smoothstep(0., 0.36, st.y + noiseVal * noiseIntensity));
    color = mix(color, liliac, smoothstep(0.36, 0.99, st.y + noiseVal * noiseIntensity));
    
	gl_FragColor = vec4(color, 1.0);
}