import { LinkModel, PortModel, DefaultLinkModel, PortModelAlignment, DefaultPortModel } from '@projectstorm/react-diagrams';

export class DevicePortModel extends DefaultPortModel {
	constructor(name: string, alignement: PortModelAlignment, isIn: boolean) {
		super({
			type: 'device',
			name: name,
			alignment: alignement,
			in: isIn,
		});
	}

	createLinkModel(): LinkModel {
		return new DefaultLinkModel();
	}
}