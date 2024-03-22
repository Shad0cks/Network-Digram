import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams';
import { DevicePortModel } from './DevicePortModel';

export interface DeviceNodeModelGenerics {
	PORT: DevicePortModel;
}

export class DeviceNodeModel extends NodeModel<NodeModelGenerics & DeviceNodeModelGenerics> {

	public iot_addr: string;
	public description: string;
	public iot_logo: string;

	constructor(iot_addr: string, description: string, iot_logo: string) {
		super({
			type: 'device',
		});
		this.iot_addr = iot_addr;
		this.description = description;
		this.iot_logo = iot_logo;
		this.addPort(new DevicePortModel("in", PortModelAlignment.TOP, true));

	}
}