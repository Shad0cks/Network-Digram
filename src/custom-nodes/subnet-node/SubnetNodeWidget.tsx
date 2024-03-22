import { SubnetNodeModel } from './SubnetNodeModel';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';


export interface SubnetNodeWidgetProps {
    node: SubnetNodeModel;
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
		flex-direction: row;
        justify-content: space-between;
        margin: 0 5px 5px 5px;
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

const SubnetNodeWidget = (props: SubnetNodeWidgetProps) => {
    // Votre logique ici
    return (
        <S.Node style={{ borderColor: props.node.isSelected() ? '#69107E' : 'black' }}>
            <S.Title>
                <S.TitleName>{props.node.iot_addr}</S.TitleName>
            </S.Title>

            <S.Content>
                <S.Description>{props.node.description}</S.Description>
            </S.Content>

            <S.PortsContainer>
                <S.PortLine>
                    <PortWidget
                        port={props.node.getPort("entry")!}
                        engine={props.engine}
                    >
                        <S.Port />
                    </PortWidget>
                </S.PortLine>
                <S.PortLine>
                    <PortWidget
                        port={props.node.getPort("out")!}
                        engine={props.engine}
                    >
                        <S.Port />
                    </PortWidget>
                </S.PortLine>
            </S.PortsContainer>
        </S.Node>
    );
}

export default SubnetNodeWidget;