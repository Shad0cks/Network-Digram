import styled from "@emotion/styled";
import { keys } from "lodash";
import './index.css';

import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { DemoCanvasWidget } from "./components/DemoCanvasWidget";
import useGraphEngine from "./hooks/EngineHook";
import SideBar from "./components/SideBar";

namespace S {
  export const Body = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    height: 100%;
  `;

  export const Header = styled.div`
    display: flex;
    background: rgb(30, 30, 30);
    flex-grow: 0;
    flex-shrink: 0;
    color: white;
    font-family: Helvetica, Arial, sans-serif;
    padding: 10px;
    align-items: center;
  `;

  export const Tray = styled.div`
    min-width: 200px;
    background: rgb(20, 20, 20);
    flex-grow: 0;
    flex-shrink: 0;
  `;

  export const Content = styled.div`
    display: flex;
    flex-grow: 1;
  `;

  export const Layer = styled.div`
    position: relative;
    flex-grow: 1;
  `;
}

function App() {
  const { activeModel, diagramEngine, updateEngine } = useGraphEngine();

  return diagramEngine && activeModel ? (

    <S.Body>
      <S.Content>
        {/* <S.Tray>
          <TrayItemWidget
            model={{ type: "in" }}
            name="In Node"
            color="rgb(192,255,0)"
          />
          <TrayItemWidget
            model={{ type: "out" }}
            name="Out Node"
            color="rgb(0,192,255)"
          />
        </S.Tray> */}
        <SideBar diagramEngine={diagramEngine} updateEngine={updateEngine}/>

        <S.Layer
          onDrop={(event) => {
            var data = JSON.parse(
              event.dataTransfer.getData("storm-diagram-node")
            );
            console.log(data)
            var nodesCount = keys(diagramEngine.getModel().getNodes()).length;

            var node: DefaultNodeModel | null = null;
            if (data.type === "in") {
              node = new DefaultNodeModel(
                "Node " + (nodesCount + 1),
                "rgb(192,255,0)"
              );
              node.addInPort("In");
            } else {
              node = new DefaultNodeModel(
                "Node " + (nodesCount + 1),
                "rgb(0,192,255)"
              );
              node.addOutPort("Out");
            }
            var point = diagramEngine.getRelativeMousePoint(event);
            node.setPosition(point);
            activeModel.addNode(node);
            updateEngine();
          }}
          onDragOver={(event) => {
            event.preventDefault();
          }}
        >
          <DemoCanvasWidget>
            <CanvasWidget engine={diagramEngine} />
          </DemoCanvasWidget>
        </S.Layer>
      </S.Content>
    </S.Body>
  ) : null;
}

export default App;
