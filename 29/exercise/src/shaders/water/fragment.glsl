uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplyer;

varying float vEleveation;

void main() {

    float mixStrength = (vEleveation + uColorOffset) * uColorMultiplyer;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

    gl_FragColor = vec4(color, 1.0);

   // #include <colorspace_fragment>;

}