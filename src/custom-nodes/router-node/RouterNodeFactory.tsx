import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { RouterNodeModel } from './RouterNodeModel';
import RouterNodeWidget from './RouterNodeWidget';

export class  RouterNodeFactory extends AbstractReactFactory< RouterNodeModel, DiagramEngine> {
	
	constructor() {
		super('router');
	}

	generateReactWidget(event: any): JSX.Element {
		return < RouterNodeWidget engine={this.engine} node={event.model} />;
	}

	generateModel(event: any) {
		return new  RouterNodeModel("", "", "");
	}
}