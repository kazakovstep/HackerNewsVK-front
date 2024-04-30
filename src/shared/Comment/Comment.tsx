import {
    Avatar,
    Button,
    Caption,
    Cell,
    Counter,
    Div,
    List,
    Paragraph,
    Spacing,
    Subhead,
    Text,
    Title
} from "@vkontakte/vkui";
import {formatUnixTimeToDateTime, useGetNewsItemByIdQuery} from "../../entities/news";
import {Icon24ChevronDown, Icon24ChevronUp, Icon28User} from "@vkontakte/icons";
import React, {useCallback, useState} from "react";
import styles from "./Comment.module.css"

export const Comment = ({ id }: { id: number }) => {
    const { data: comment, isFetching } = useGetNewsItemByIdQuery(id);
    const [showChildren, setShowChildren] = useState(false);

    const toggleChildren = useCallback(() => {
        setShowChildren(prev => !prev);
    }, []);

    if (isFetching) return <Div>Loading...</Div>;


    return (
        <Div key={comment?.id} className={styles.comment}>
            <Cell before={<Avatar fallbackIcon={<Icon28User />} size={32} />}>
                <Title level={"3"}>{comment?.by} </Title>
                <Caption level={"1"}>{formatUnixTimeToDateTime(String(comment?.time))}</Caption>
            </Cell>
            <Paragraph style={{ paddingLeft: 58 }}
                // @ts-ignore
                       dangerouslySetInnerHTML={{ __html: comment?.text }}/>

            {comment?.kids && comment.kids.length > 0 && (
                <Button mode="tertiary" before={showChildren ? <Icon24ChevronUp /> : <Icon24ChevronDown />} onClick={toggleChildren} className={styles.showButton}>
                    {showChildren ? 'Скрыть ответы' : 'Показать ответы'}
                </Button>
            )}

            {showChildren && comment?.kids?.map((childId) => (
                <Div key={childId} style={{ paddingLeft: 58 }}>
                    <Comment id={childId} />
                </Div>
            ))}
        </Div>
    );
};