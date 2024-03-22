import { Button, Label, TextInput } from 'flowbite-react';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { useState } from 'react';
import { SubnetNodeModel } from '../custom-nodes/subnet-node/SubnetNodeModel';

function CreateSubnet({ diagramEngine, updateEngine }: { diagramEngine: DiagramEngine, updateEngine: () => void }) {

    const [mask, setmask] = useState<string>("")

    const addRouter = () => {

        const node = new SubnetNodeModel(
            "Subnet", mask
        );

        node.setPosition(0, 0);

        diagramEngine.getModel().addNode(node);
        updateEngine();

        setmask("")
    }

    return (
        <form onKeyUp={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} onSubmit={(e) => {
            e.preventDefault();
            addRouter();
        }}>
            <div className="max-w-md flex flex-col gap-2">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="iot-mask" value="Subnet" />
                    </div>
                    <TextInput id="iot-mask" type="text" value={mask} placeholder="127.0.0.1/24" onChange={(e) => setmask(e.target.value)} />
                </div>
            </div>
            <Button color="dark" className='mt-5' type="submit">Add</Button>
        </form>

    );
}

export default CreateSubnet;