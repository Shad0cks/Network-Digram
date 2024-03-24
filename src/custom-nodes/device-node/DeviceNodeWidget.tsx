import { DeviceNodeModel } from './DeviceNodeModel';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';


export interface DeviceNodeWidgetProps {
    node: DeviceNodeModel;
    engine: DiagramEngine;
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
    export const PortTop = styled.div`
		width: 10px;
		height: 10px;
		z-index: 10;
		background-color: #C63C1E;
		cursor: pointer;
        clip-path: polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%);
        position: absolute;
        left: 50%;
        transform: translate(-50%, 50%);
        top: -10px;
	`;
    export const Node = styled.div`
		border-radius: 5px;
		font-family: sans-serif;
		color: white;
		border: solid 2px black;
		overflow: visible;
		font-size: 11px;
        width: 100px;
		height: max-content;
	`;
    export const Title = styled.div`
        text-align:center;
        flex-direction: column;
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		white-space: nowrap;
		justify-items: center;
	`;
    export const TitleName = styled.div`
		flex-grow: 1;
		padding: 5px 5px;
	`;
    export const PortLine = styled.div`
		display: flex;
        align-items: center;
        gap: 5px;
		
	`;
    export const PortsContainer = styled.div`
		flex-grow: 1;
		display: flex;
		flex-direction: column;
        gap: 5px;
        margin: 3px;
	`;
    export const Content = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: fit-content;
        margin: 3px 0 3px 0;
    `

    export const Description = styled.p`
    word-break: break-word;
    white-space: pre-wrap;
    text-align: center;
    `
    export const logo = styled.img`
    width: 80%;
    `
}

const DeviceNodeWidget = (props: DeviceNodeWidgetProps) => {
    // Votre logique ici
    return (
        <S.Node style={{ borderColor: props.node.isSelected() ? '#69107E' : 'black' }}>
            <PortWidget
                port={props.node.getPort("in")!}
                engine={props.engine}
            >
                <S.PortTop onClick={(e) => e.stopPropagation()} />
            </PortWidget>
            <S.Title>
                {
                    Object.keys(props.node.getPorts()).map((item, i) => item !== "in" ? (
                        <S.PortLine key={i}>
                            <PortWidget
                                port={props.node.getPort(item)!}
                                engine={props.engine}
                            >
                                <S.Port onClick={(e) => e.stopPropagation()} />
                            </PortWidget>
                            {item}
                        </S.PortLine>
                    ) : null)
                }
            </S.Title>

            <S.Content>
                <S.logo draggable="false" src={props.node.iot_logo}></S.logo>
                <S.Description>{props.node.description}</S.Description>
            </S.Content>

            <S.PortsContainer>
                {
                    props.node.iot_ports.map((item, i) => {
                        return (
                            <S.PortLine key={i}>
                                {item}
                            </S.PortLine>
                        )
                    })
                }
            </S.PortsContainer>
        </S.Node>
    );
}

export default DeviceNodeWidget;