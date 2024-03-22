import * as React from 'react';
import { DiamondNodeModel } from './DiamondNodeModel';
import { DefaultPortLabel, DiagramEngine, PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';
import pcLogo from '../images/device-logo/pc.png'; // with import


export interface DiamondNodeWidgetProps {
	node: DiamondNodeModel;
	engine: DiagramEngine;
	size: number;
}

namespace S {
    export const Port = styled.div`
		width: 10px;
		height: 6px;
		z-index: 10;
		background-color: #C63C1E;
		cursor: pointer;
        clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%);
	`;
    export const Node = styled.div `
        width: min-content,
		border-radius: 5px;
		font-family: sans-serif;
		color: white;
		border: solid 2px black;
		overflow: visible;
		font-size: 11px;
	`;
    export const Title = styled.div `
        text-align:center;
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		white-space: nowrap;
		justify-items: center;
	`;
    export const TitleName = styled.div `
		flex-grow: 1;
		padding: 5px 5px;
	`;
    export const PortLine = styled.div `
		display: flex;
        align-items: center;
        gap: 5px;
		
	`;
    export const PortsContainer = styled.div `
		flex-grow: 1;
		display: flex;
		flex-direction: column;
        gap: 5px;
        margin: 3px;
	`;
    export const Content = styled.div `
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: fit-content;
        margin: 3px 0 3px 0;
    `

    export const Description = styled.p `
    word-break: break-word;
    white-space: pre-wrap;
    text-align: center;
    `
    export const logo  = styled.img `
    width: 80%;
    `
}

const DiamondNodeWidget = (props: DiamondNodeWidgetProps) => {
    // Votre logique ici
    
		return (
			<S.Node style={{
                width: "min-content",
				height: "max-content",
            
            }}>
                <S.Title>
                    <S.TitleName>192.168.0.1</S.TitleName>
                </S.Title>

                <S.Content>
                    <S.logo draggable="false" src={pcLogo}></S.logo>
                    <S.Description>Target A</S.Description>
                </S.Content>
				<S.PortsContainer>
             
                {
                    Object.keys(props.node.getPorts()).map((item, i) => (
                        <S.PortLine>
                    <PortWidget
                        port={props.node.getPort(item)!}
                        engine={props.engine}
				>
					 <S.Port /> 
				</PortWidget>
                {item}
                </S.PortLine>
                    ))
                }
                </S.PortsContainer>
            </S.Node>
		);
	}
  
  export default DiamondNodeWidget;