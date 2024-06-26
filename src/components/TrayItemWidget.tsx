import * as React from 'react';
import styled from '@emotion/styled';

export interface TrayItemWidgetProps {
	model: any;
	color?: string;
	name: string;
}

namespace S {
	export const Tray = styled.div<{ color: string | undefined}>`
		color: white;
		font-family: Helvetica, Arial;
		padding: 5px;
		margin: 0px 10px;
		border: solid 1px ${(p) => p.color};
		border-radius: 5px;
		margin-bottom: 2px;
		cursor: pointer;
	`;
}

export class TrayItemWidget extends React.Component<TrayItemWidgetProps> {
	render() {
		return (
			<S.Tray
				color={this.props.color}
				draggable={true}
				onDragStart={(event) => {
					console.log(event)
					event.dataTransfer.setData('storm-diagram-node', JSON.stringify(this.props.model));
				}}
				className="tray-item"
			>
				{this.props.name}
			</S.Tray>
		);
	}
}