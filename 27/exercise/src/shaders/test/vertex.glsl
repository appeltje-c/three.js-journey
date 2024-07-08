
// All matrices are uniform since they are the same for all vertices
// Each matrix takes care of a part of the transformation
// To apply a matrix you have to multiply it with the vec4 position 
// coordinate as done below in assigning the gl_Position
// The matrices must have the same size as the coordinate
// in this case mat4 (matrix 4) for the gl_Position vec4 (Vector4)
// You can also have mat3 for vec3 etc

// The clipspace Matrix.
//uniform mat4 projectionMatrix;

// Matrix to position the Camera in the clipspace
// for the position, rotation, field of view, near and far
//uniform mat4 viewMatrix;

// Matrix to position the Mesh in the clipspace
// for the position, rotation and scale
//uniform mat4 modelMatrix;

// The Vector3 is the position attribute with x,y and z coordinates
// This retrievs the x,y,z values from the geometry we use this
// shader with 
// By default a Three.js gemoetry contains some attributes
// - normal : the outside of the vertices
// - position : coordinates of the vertices
// - uv : how to place the texture
// We can add our own attributes to get 
// them inside the customer shader
//attribute vec3 position;

// Our custom attribute
// the array with random values 
attribute float aRandom;

// Our defined uniform
// based on the uniforms params when 
// creating the geometry
uniform vec2 uFrequency;

// the customer uniform time value
uniform float uTime;

// the uv attribute which is default 
// available on the three.js mesh
//attribute vec2 uv;

// Attributes are the only variables that 
// cannot be directly supplied to the
// fragment shader. 
// This why we create so called varying
// variables that we assign the value of an 
// attribute and then can address in the 
// fragment shader   
varying float vRandom;
varying vec2 vUv;
varying float vElevation;

/**
 * Called automatically by the GPU
 */
void main() {

    // We assign the predefined gl_Position which will contain 
    // the position of the vertex on the screen
    // and needs to be a Vector 4   
    // It is a Vector 4 because we provide the coordinates in clipspace (a box)
    // where we supply x, y and z to have a coordinate in 3d space
    // and the fourth (w) is dertmining the perspective
    // So we provide the x,y,z corrdinates in the Vector3 together with w = 1.0

    // The position of the Mesh
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

    // We shape the vertices into a wave shape
    // This is the power of the custom shaders, it is very difficult to achieve
    // without custom shader
    modelPosition.z += elevation;

    //modelPosition += aRandom * 0.1;

    // The position of the Camera
    vec4 viewPosition = viewMatrix * modelPosition;

    // Position of the clipspace
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    // we can change the axis position like below although we should avoid this
    // gl_Position.x = 0.5;

    // Assign the attribute values to the varying variables
    // so we can address them in the fragment shader
    vRandom = aRandom;
    vUv = uv;
    vElevation = elevation;

}