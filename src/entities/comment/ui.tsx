import {
    Avatar,
    Button,
    Caption,
    Cell,
    Div,
    Paragraph,
    Title
} from "@vkontakte/vkui";
import {formatUnixTimeToDateTime} from "./model";
import {Icon24ChevronDown, Icon24ChevronUp, Icon28User} from "@vkontakte/icons";
import React, {useCallback, useEffect, useState} from "react";
import styles from "../../app/styles/Comment.module.css"
import {useGetNewsItemByIdQuery} from "./api";
import {useDispatch} from "react-redux";
import {actions as kidsActions} from "../../app/store/slices/kidsSlice.slice"
import Ui from "../../shared/Loading/ui";

export const Comment = ({id}: { id: number }) => {
    const {data: comment, isLoading} = useGetNewsItemByIdQuery(id);
    const [showChildren, setShowChildren] = useState(false);

    const toggleChildren = useCallback(() => {
        setShowChildren(prev => !prev);
    }, []);

    const dispatch = useDispatch();

    useEffect(() => {
        if (comment) {
            dispatch(kidsActions.isDeleted(comment?.deleted !== undefined))
        }
    }, [comment]);

    if (isLoading) return <Paragraph>Loading...</Paragraph>

    return (
        <>
            {comment?.deleted ? null :
                <Div key={comment?.id} className={styles.comment}>
                    <Cell before={<Avatar fallbackIcon={<Icon28User/>} size={32}/>}>
                        <Title level={"3"}>{comment?.by} </Title>
                        <Caption level={"1"}>{formatUnixTimeToDateTime(String(comment?.time))}</Caption>
                    </Cell>
                    <Paragraph style={{paddingLeft: 58}}
                               dangerouslySetInnerHTML={String(comment?.text) !== "undefined" ? {__html: String(comment?.text)} : undefined}/>
                    {comment?.kids && comment.kids.length > 0 && (
                        <Button mode="tertiary" before={showChildren ? <Icon24ChevronUp/> : <Icon24ChevronDown/>}
                                onClick={toggleChildren} className={styles.showButton}>
                            {showChildren ? 'Скрыть ответы' : 'Показать ответы'}
                        </Button>
                    )}
                    {showChildren && comment?.kids?.map((childId) => (
                        <Div key={childId} style={{paddingLeft: 58}}>
                            <Comment id={childId}/>
                        </Div>
                    ))}
                </Div>}
        </>
    );
};