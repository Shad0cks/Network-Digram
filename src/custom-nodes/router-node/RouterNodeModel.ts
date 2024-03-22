import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams';
import { RouterPortModel } from './RouterPortModel';

export interface  RouterNodeModelGenerics {
	PORT: RouterPortModel;
}

export class RouterNodeModel extends NodeModel<NodeModelGenerics & RouterNodeModelGenerics> {

	public iot_addr: string;
	public iot_mask: string;
	public description: string;
	public iot_logo: string;

	constructor(iot_addr: string, description: string, iot_logo: string, iot_mask: string) {
		super({
			type: 'router',
		});
		this.iot_addr = iot_addr;
		this.description = description;
		this.iot_logo = iot_logo;
		this.iot_mask = iot_mask;
		this.addPort(new RouterPortModel("out", PortModelAlignment.BOTTOM, false))
	}
}