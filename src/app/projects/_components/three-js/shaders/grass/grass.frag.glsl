
varying vec2 vUv;
varying vec3 cpos;
varying vec3 v_normal;
uniform vec3 shadowColor;
uniform vec3 highlightColor;

// varying vec3 vColor;
uniform vec3 lightDir;

void main() {
    //
    vec3 pos = cpos;
    vec2 uv = vUv;
    // vec3 color = mix(color1, color2, pos.y);

   

    vec3 L = normalize(lightDir);
    // vec3 V = normalize(v_view);
    vec3 N = normalize(v_normal);
    
    // float diffuseFactor = max(dot(N, L), 0.);
    float halfLambert = dot(N, L)*0.5 + 0.5;
    // I'm going to leave light linear for now but later change the ramp
    // 
    // halfLambert = pow(halfLambert, _Bias);
    float bandedLight = floor(halfLambert * 3.) / (2.);
    vec3 color = mix(shadowColor, highlightColor, pos.y);
    // vec3 color = mix(shadowColor, highlightColor, pos.y)
    gl_FragColor = vec4(color, 1.);
}
