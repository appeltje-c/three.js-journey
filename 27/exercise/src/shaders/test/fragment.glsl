
// We determine the preciscion of the float ourselves
// highp might have a bad impact on performance
// and is not supported on some devices 
// lowp can create bugs and a lack of precsision
// mostly mediump is used since it is supported on 
// all devices and provides sufficient precisions
//precision mediump float;

// The custom color we supply in 
// the three js shader material definition
uniform vec3 uColor;

// The texture
uniform sampler2D uTexture;

// we 'receive' the varying variables 
// that were assigned by the attribute
// variable in the vertext shader
varying float vRandom;
varying vec2 vUv;
varying float vElevation;

/**
 * Called by the GPU
 */
void main() {

    // load the texture
    vec4 textureColor = texture2D(uTexture, vUv);

    // add the color 'tones'
    textureColor.rgb *= vElevation * 2.0 + 0.9;

    // The predefined gl_FragColor needs to be assigned and will
    // color of the fragment
    // The vec4 contains the r (red), g (green) and b (blue) 
    // values together with the fourth one a (alpha) 
    gl_FragColor = textureColor;
}