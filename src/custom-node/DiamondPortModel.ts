import { LinkModel, PortModel, DefaultLinkModel, PortModelAlignment } from '@projectstorm/react-diagrams';

export class DiamondPortModel extends PortModel {
	constructor(alignment: PortModelAlignment, name: string) {
		super({
			type: 'diamond',
			name: name,
			alignment: alignment
		});
	}

	createLinkModel(): LinkModel {
		return new DefaultLinkModel();
	}
}