import { Badge, Button, Label, Sidebar, TextInput } from 'flowbite-react';
import { BiBuoy } from 'react-icons/bi';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { Accordion } from 'flowbite-react';
import siteLogo from "../images/logo.png"
function SideBar() {
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
                                <div className="max-w-md flex flex-col gap-2">
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="iot-ip" value="IP address" />
                                        </div>
                                        <TextInput id="iot-ip" type="text" placeholder="127.0.0.1" required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="iot-ip" value="IP address" />
                                        </div>
                                        <TextInput id="iot-ip" type="text" placeholder="127.0.0.1" required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="iot-ip" value="IP address" />
                                        </div>
                                        <TextInput id="iot-ip" type="text" placeholder="127.0.0.1" required />
                                    </div>
                                </div>
                                <Button color="dark" className='mt-5'>Dark</Button>
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