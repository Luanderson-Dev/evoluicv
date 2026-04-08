export function LogoIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			width='28'
			height='28'
			viewBox='0 0 32 32'
			xmlns='http://www.w3.org/2000/svg'
		>
			<style>{`
        .blue-face { fill: #007bff; }
        .blue-top { fill: #3399ff; }
        .blue-side { fill: #0056b3; }
        rect { shape-rendering: crispEdges; }
      `}</style>
			<g id='l-pixelart-3d-v2'>
				<rect
					x='4'
					y='0'
					width='8'
					height='24'
					className='blue-face'
				/>
				<rect
					x='4'
					y='0'
					width='8'
					height='4'
					className='blue-top'
				/>
				<rect
					x='12'
					y='4'
					width='4'
					height='20'
					className='blue-side'
				/>
				<rect
					x='12'
					y='24'
					width='16'
					height='8'
					className='blue-face'
				/>
				<rect
					x='12'
					y='20'
					width='16'
					height='4'
					className='blue-top'
				/>
				<rect
					x='16'
					y='28'
					width='12'
					height='4'
					className='blue-side'
				/>
				<rect
					x='28'
					y='24'
					width='4'
					height='8'
					className='blue-side'
				/>
			</g>
		</svg>
	);
}
