import { LinkModel, PortModel, DefaultLinkModel, PortModelAlignment, DefaultPortModel, RightAngleLinkModel, PathFindingLinkModel, RightAngleLinkFactory, RightAngleLinkWidget } from '@projectstorm/react-diagrams';

export class RouterPortModel extends DefaultPortModel {
	constructor(name: string, alignment: PortModelAlignment, isIn: boolean) {
		super({
			type: 'router',
			name: name,
			alignment: alignment,
			in: isIn,
		});
	}

	createLinkModel(): LinkModel {
		return new RightAngleLinkModel();
	}
}