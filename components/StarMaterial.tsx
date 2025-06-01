// components/StarMaterial.tsx
'use client'
import React, { FC, useMemo } from 'react'
import * as THREE from 'three'

export const StarMaterial: FC = () => {
	const mat = useMemo(() => {
		return new THREE.ShaderMaterial({
			vertexColors: true,
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
			vertexShader: /* glsl */ `
                attribute float size;   // 星の基本サイズ (StarPointsから供給)
                // attribute vec3 color;  // ★ この行を削除またはコメントアウトします
                varying vec3 vColor;   // フラグメントシェーダーへ渡す色

                void main() {
                    // 'color' は vertexColors: true により Three.js が自動的に提供するアトリビュート
                    vColor = color; 
                    
                    gl_PointSize = size;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
			fragmentShader: /* glsl */ `
                varying vec3 vColor;

                void main() {
                    vec2 coord = gl_PointCoord - vec2(0.5);
                    float distanceToCenterSquared = dot(coord, coord);

                    if (distanceToCenterSquared > 0.25) {
                        discard;
                    }

                    float alpha = 1.0;
                    gl_FragColor = vec4(vColor, alpha);
                }
            `,
		})
	}, [])

	return <primitive object={mat} attach='material' />
}
