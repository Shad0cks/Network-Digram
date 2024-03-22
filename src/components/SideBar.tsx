import { Badge, Button, Label, Sidebar, TextInput } from 'flowbite-react';
import { HiViewBoards } from 'react-icons/hi';
import { Accordion } from 'flowbite-react';
import siteLogo from "../images/logo.png"
import { DiagramEngine } from '@projectstorm/react-diagrams';
import CreateClient from './CreateClient';
function SideBar({ diagramEngine, updateEngine }: { diagramEngine: DiagramEngine, updateEngine: () => void }) {
    return (
        <Sidebar className='dark' aria-label="Sidebar with content separator example" >
            <Sidebar.Logo href="#" img={siteLogo} className='[&>img]:h-16' imgAlt="Flowbite logo">
                Network Graph
            </Sidebar.Logo>
            <Sidebar.Items>

                <Sidebar.ItemGroup>
                    <Accordion collapseAll className='border-none h-full'>

                        <Accordion.Panel>
                            <Accordion.Title><div className='flex-row flex gap-4 items-center'><HiViewBoards />Client</div></Accordion.Title>
                            <Accordion.Content>
                                <CreateClient diagramEngine={diagramEngine} updateEngine={updateEngine}/>
                            </Accordion.Content>
                        </Accordion.Panel>

                        <Accordion.Panel>
                            <Accordion.Title><div className='flex-row flex gap-4 items-center'><HiViewBoards />Subnet</div></Accordion.Title>
                            <Accordion.Content>
                                <h1>ds</h1>
                            </Accordion.Content>
                        </Accordion.Panel>

                        <Accordion.Panel>
                            <Accordion.Title><div className='flex-row flex gap-4 items-center'><HiViewBoards />Router</div></Accordion.Title>
                            <Accordion.Content>
                                <h1>ds</h1>
                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>
                    <Sidebar.CTA>
                        <div className="mb-3 flex items-center">
                            <Badge color="warning">Beta</Badge>
                        </div>
                        <div className="mb-3 text-sm text-cyan-900 dark:text-gray-400">
                            Made by <a href='https://github.com/shad0cks' target="_blank">Shad0cks</a>
                        </div>
                    </Sidebar.CTA>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}

export default SideBar;