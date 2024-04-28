import {Avatar, Card, CardGrid, Div, Group, SimpleCell, Spacing, Text, Title} from "@vkontakte/vkui";
import {Icon28User} from "@vkontakte/icons";
import React from "react";
import {NewsItem} from "./model";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";

const NewsPreview = ({item}: { item: NewsItem }) => {

    const routeNavigator = useRouteNavigator();

    return (
        <Group key={item.id} mode="plain" onClick={() => routeNavigator.push(`/news/${item.id}`)}>
            <CardGrid size="l">
                <Card mode="outline">
                    <Div>
                        <SimpleCell before={<Avatar fallbackIcon={<Icon28User/>}/>}
                                    after={`Оценка: ${item.score}`}>
                            {item.by}
                        </SimpleCell>
                        <Spacing size={8}/>
                        <Title level="2" weight="2">
                            {item.title}
                        </Title>
                        <Spacing size={16}/>
                        <Text weight="1">
                            {item.time}
                        </Text>
                    </Div>
                </Card>
            </CardGrid>
        </Group>
    );
}

export default NewsPreview;