import SubnetNodeWidget from './SubnetNodeWidget';
import { SubnetNodeModel } from './SubnetNodeModel';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class SubnetNodeFactory extends AbstractReactFactory<SubnetNodeModel, DiagramEngine> {

	constructor() {
		super('subnet');
	}

	generateReactWidget(event: any): JSX.Element {
		return <SubnetNodeWidget engine={this.engine} node={event.model} />;
	}

	generateModel(event: any) {
		return new SubnetNodeModel("", "");
	}
}