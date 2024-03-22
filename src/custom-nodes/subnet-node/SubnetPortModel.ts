import { LinkModel, PortModel, DefaultLinkModel, PortModelAlignment, DefaultPortModel } from '@projectstorm/react-diagrams';

export class SubnetPortModel extends DefaultPortModel {
	constructor(name: string, alignment: PortModelAlignment, isIn: boolean) {
		super({
			type: 'subnet',
			name: name,
			alignment: alignment,
			in: isIn
		});
	}

	createLinkModel(): LinkModel {
		return new DefaultLinkModel();
	}
}