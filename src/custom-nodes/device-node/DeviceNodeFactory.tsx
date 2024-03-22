import  DeviceNodeWidget  from './DeviceNodeWidget';
import { DeviceNodeModel } from './DeviceNodeModel';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class DeviceNodeFactory extends AbstractReactFactory<DeviceNodeModel, DiagramEngine> {
	
	constructor() {
		super('device');
	}

	generateReactWidget(event: any): JSX.Element {
		return <DeviceNodeWidget engine={this.engine} node={event.model} />;
	}

	generateModel(event: any) {
		return new DeviceNodeModel("", "", "");
	}
}