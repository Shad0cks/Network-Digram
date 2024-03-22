import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams';
import { SubnetPortModel } from './SubnetPortModel';

export interface SubnetNodeModelGenerics {
	PORT: SubnetPortModel;
}

export class SubnetNodeModel extends NodeModel<NodeModelGenerics & SubnetNodeModelGenerics> {

	public iot_addr: string;
	public description: string;

	constructor(iot_addr: string, description: string) {
		super({
			type: 'subnet',
		});
		this.iot_addr = iot_addr;
		this.description = description;
		this.addPort(new SubnetPortModel("entry", PortModelAlignment.LEFT, true))
		this.addPort(new SubnetPortModel("out", PortModelAlignment.RIGHT, false))
	}
}