export const vertexShader = `uniform sampler2D uTexture;
uniform vec2 uOffset;
uniform float uMaxOffset;
varying vec2 vUv;

#define M_PI 3.1415926535897932384626433832795

vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset, float maxOffset, vec3 scale) {
    vec2 clampedOffset = clamp(offset * (1.0 / scale.xy), -maxOffset, maxOffset);
    position.x = position.x + (sin(uv.y * M_PI) * clampedOffset.x);
    position.y = position.y + (sin(uv.x * M_PI) * clampedOffset.y);
    return position;
}


uniform vec3 uScale;

void main() {
    vUv = uv;
    vec3 newPosition = deformationCurve(position, uv, uOffset, uMaxOffset, uScale);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}

`;

export const fragmentShader = `uniform sampler2D uTexture;
uniform float uAlpha;
uniform vec2  uRgbOffset;
uniform float uRgbShiftIntensity;
uniform float uMaxRGBOffset;
varying vec2 vUv;

vec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset, float intensity, float maxRGBOffset) {
    vec2 clampedOffset = clamp(offset, -maxRGBOffset, maxRGBOffset);
    float r = texture2D(textureImage, uv + clampedOffset * intensity).r;
    vec2 gb = texture2D(textureImage, uv).gb;
    return vec3(r, gb);
}

void main() {
    vec3 color = rgbShift(uTexture, vUv, uRgbOffset, uRgbShiftIntensity, uMaxRGBOffset);
    gl_FragColor = vec4(color, uAlpha);
}
`;
