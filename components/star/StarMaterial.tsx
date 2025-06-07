// components/StarMaterial.tsx
'use client'
import React, { FC, useMemo } from 'react'
import * as THREE from 'three'

export const StarMaterial: FC = () => {
	const mat = useMemo(() => {
		return new THREE.ShaderMaterial({
			vertexColors: true,
			transparent: true,
			blending: THREE.AdditiveBlending, // 加算合成は光っている表現に適しています
			depthWrite: false, // 半透明や加算合成ではfalseにすることが多いです
			vertexShader: /* glsl */ `
                attribute float size;   // 星の基本サイズ (StarPointsから供給)
                // attribute vec3 color; // vertexColors: true のため、この行は不要
                varying vec3 vColor;   // フラグメントシェーダーへ渡す色

                void main() {
                    // 'color' は vertexColors: true により Three.js が自動的に提供するアトリビュート
                    vColor = color; 
                    
                    gl_PointSize = size; // StarPointsで計算されたサイズをそのまま使用
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
			fragmentShader: /* glsl */ `
                varying vec3 vColor; // 頂点シェーダーから受け取る色

                void main() {
                    // gl_PointCoord はポイントスプライト内の座標で、中心が (0.5, 0.5)
                    vec2 coord = gl_PointCoord - vec2(0.5);
                    // 中心からの距離の2乗。半径0.5の円の縁で0.25になります。
                    float distSq = dot(coord, coord);

                    // 星の光彩効果のためのアルファ計算
                    // innerCoreRadiusSq: 星の中心部の完全に不透明な部分の半径の2乗
                    // outerEdgeRadiusSq: 星の光が完全に消える外縁の半径の2乗 (通常は0.25)
                    float innerCoreRadiusSq = 0.01; // 中心核の半径の2乗 (値を小さくすると中心点が小さく、大きくすると広がる)
                    float outerEdgeRadiusSq = 0.1; // ポイントの縁

                    // smoothstepを使って、中心から縁に向かって滑らかにアルファが減少するようにします
                    // distSq が innerCoreRadiusSq まではアルファ1.0 (完全に不透明)
                    // distSq が innerCoreRadiusSq から outerEdgeRadiusSq に向かうにつれてアルファが1.0から0.0に変化
                    float alpha = 1.0 - smoothstep(innerCoreRadiusSq, outerEdgeRadiusSq, distSq);

                    // アルファが非常に小さい場合はピクセルを破棄 (パフォーマンスのため)
                    if (alpha < 0.01) {
                        discard;
                    }

                    // 最終的な色とアルファ値を設定
                    // オプション：中心部をさらに明るくしたい場合
                    // float brightnessBoost = 0.5; // 中心部の明るさのブースト量
                    // float coreBrightness = (1.0 - smoothstep(0.0, innerCoreRadiusSq * 0.5, distSq)) * brightnessBoost;
                    // vec3 finalColor = vColor + vColor * coreBrightness;
                    // gl_FragColor = vec4(finalColor, alpha);

                    gl_FragColor = vec4(vColor, alpha);
                }
            `,
		})
	}, [])

	return <primitive object={mat} attach='material' />
}
