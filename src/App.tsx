import React from 'react';
import './App.css';
import {useActiveVkuiLocation, useGetPanelForView} from "@vkontakte/vk-mini-apps-router";
import {Panel, Root, View} from "@vkontakte/vkui";
import {useGetNewsItemsQuery} from "./entities/news";

function App() {
    const {view: activeView} = useActiveVkuiLocation() as { view: string };
    const activePanel = useGetPanelForView('default_view') as string;

    const {data} = useGetNewsItemsQuery();

    console.log(data)

    return (
        <Root activeView={activeView}>
            <View nav="default_view" activePanel={activePanel}>
                <Panel nav="home_panel"></Panel>
                <Panel nav="news_panel"></Panel>
            </View>
        </Root>
    )
}

export default App;
