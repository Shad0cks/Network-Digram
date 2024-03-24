import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams';
import { DevicePortModel } from './DevicePortModel';

export interface DeviceNodeModelGenerics {
	PORT: DevicePortModel;
}

export class DeviceNodeModel extends NodeModel<NodeModelGenerics & DeviceNodeModelGenerics> {

	public description: string;
	public iot_logo: string;
	public iot_ports: string[];

	constructor(description: string, iot_logo: string, iot_ports: string[]) {
		super({
			type: 'device',
		});
		this.description = description;
		this.iot_logo = iot_logo;
		this.iot_ports = iot_ports;
	}
}