// import workouts from '@/app/(app)/workouts';
// import { s } from '@/styles/global';
// import React, { PropsWithChildren } from 'react';
// import { Text, View } from 'react-native';
// import ErrorView from './ErrorView';
// import LoadingView from './LoadingView';
// import NotFoundView from './NotFoundView';
// import { DefaultError } from '@tanstack/react-query';

import { DefaultError } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import { Text } from "react-native";
import LoadingView from "./LoadingView";
import NotFoundView from "./MessageView";
import MessageView from "./MessageView";
import { CircleX } from "lucide-react-native";

// interface RequestResultsViewProps extends PropsWithChildren {
//     isPending: boolean;
//     isError: boolean;
//     hasData: boolean;
//     hasSearch: boolean;
//     error: DefaultError | null;
//     NotFoundComponent?: React.ReactNode;
//     EmptyComponent?: React.ReactNode;
// }


// export default function RequestResultsView(
//     { children, NotFoundComponent, EmptyComponent, ...request }: RequestResultsViewProps) {
//     return (
//         <>
//          
//         </>


//     )
// }
interface RequestResultsViewProps extends PropsWithChildren {
    isPending: boolean;
    isError: boolean;
    hasData: boolean;
    hasSearch: boolean;
    ErrorComponent?: React.ReactNode,
    NotFoundComponent?: React.ReactNode;
    EmptyComponent?: React.ReactNode;
}

export default function RequestResultsView({
    children,
    NotFoundComponent,
    EmptyComponent,
    ErrorComponent,
    ...request
}: RequestResultsViewProps) {



    if (request.isPending)
        return <LoadingView />;

    if (request.isError)
        return <>
            {ErrorComponent
                || <MessageView
                    icon={CircleX}
                    message="Ocorreu um erro!"
                    description='Estamos resolvendo, tente novamente mais tarde.' />}
        </>

    if (request.hasData)
        return <>{children}</>;


    if (request.hasSearch)
        return <>{NotFoundComponent
            || <MessageView message="Sem resultados" description="Que pena! Não encontramos o que você procura!" />}</>;


    return <>{EmptyComponent ||
        <MessageView
            message="Sem resultados"
            description="Que pena! Não encontramos o que você procura!" />}</>;


}

