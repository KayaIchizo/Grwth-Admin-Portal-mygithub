import { useRouter } from 'next/router';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
// @mui
import { Container, Grid } from '@mui/material';
// hooks
import useSettings from 'src/hooks/useSettings';
// layouts
import Layout from 'src/layouts';
// components
import Page from 'src/components/Page';
import { ImageGallery, QAPanel } from 'src/components/dashboard';
import { QA_TASK_QUERY } from 'src/apollo/queries';
import { QA_FRAMES_VAR, QA_TASK_ACTION_VAR, QA_TASK_VAR } from 'src/apollo/variables';
import { QAFramesFilter, QATask, QATasks, QATasksFilter, QATaskVar, RenderedAsset, RenderedAssetType, TraitIssue } from 'src/@types/qa';
import { QA_TASK_MUTATION } from 'src/apollo/mutations';
import { useSnackbar } from 'notistack';
import useAuth from 'src/hooks/useAuth';
import { PATH_ROUTE } from 'src/routes/paths';
import DataLoadingScreen from 'src/components/DataLoadingScreen';
import useHandleResponse from 'src/hooks/useHandleResponse';
import { NotifyMessages } from 'src/utils/constants';

type QATaskFetch = {
    qaTask: QATask
}

type RenderedAssets = {
    renderedAssets: RenderedAsset[]
}

// ----------------------------------------------------------------------

QAScreen.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function QAScreen() {
    const { themeStretch } = useSettings();
    const { query, push } = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth();
    const { handleApolloRes } = useHandleResponse();
    const { taskId, batchId, renderId } = query;

    const defaultQueryVars: QATasksFilter = QA_TASK_VAR.byFilter(
        undefined,
        undefined,
        user?.email || undefined,
        undefined,
        undefined,
        undefined,
        1
    );
    console.log(defaultQueryVars);
    const [qaTaskFail, { loading: taskFailing }] = useMutation(QA_TASK_MUTATION.fail)
    const [qaTaskApprove, { loading: taskApproving }] = useMutation(QA_TASK_MUTATION.approve)
    const [qaTaskReset, { loading: taskReseting }] = useMutation(QA_TASK_MUTATION.reset)
    const { loading, data } = useQuery<QATaskFetch, QATaskVar>(QA_TASK_QUERY.get_qa_task, {
        variables: QA_TASK_VAR.byBatchId(taskId?.toString() || '')
    })

    const [, { refetch }] = useLazyQuery<QATasks, QATasksFilter>(QA_TASK_QUERY.get_qa_tasks, {
        variables: defaultQueryVars
    })

    const { data: framesData } = useQuery<RenderedAssets, QAFramesFilter>(QA_TASK_QUERY.get_qa_frames, {
        variables: QA_FRAMES_VAR.byId(batchId?.toString() || '', parseInt(renderId?.toString() || '0'), RenderedAssetType.PNG)
    })

    const handleQATaskFail = async (mediaIssues: string[], traitIssues: TraitIssue[], comments: string) => qaTaskFail({
        variables: QA_TASK_ACTION_VAR.fail(data!.qaTask._id, mediaIssues, traitIssues, comments),
        update(cache, result) {
            handleApolloRes(result, NotifyMessages.FAILED)
        },
    })

    const handleQATaskReset = async (comments: string) => qaTaskReset({
        variables: QA_TASK_ACTION_VAR.reset(data!.qaTask._id, comments),
        update(cache, result) {
            handleApolloRes(result, NotifyMessages.RESET)
        },
    })

    const handleQATaskApprove = async (comments: string) =>
        qaTaskApprove({
            variables: QA_TASK_ACTION_VAR.approve(data!.qaTask._id, comments),
            update(cache, result) {
                handleApolloRes(result, NotifyMessages.APPROVED)
            },
        })


    const handleNavigate = async (isNext: boolean, status: string) => {
        try {
            const query: QATasksFilter = isNext ? {
                ...defaultQueryVars,
                after: taskId?.toString() || undefined,
                search: (status && status !== "ALL") ? status : undefined
            } : {
                ...defaultQueryVars,
                before: taskId?.toString() || undefined,
                search: (status && status !== "ALL") ? status : undefined
            }
            const { data } = await refetch(query);
            if (data?.qaTasks?.length > 0) {
                const [task] = data.qaTasks
                push({
                    pathname: PATH_ROUTE.qaTool.qaTask,
                    query: { collection: task.collection, tokenId: task.tokenId, batchName: task.batch, taskId: task._id, renderId: task.renderId, batchId: task.batchId }
                });
            } else {
                enqueueSnackbar(
                    isNext ? "This is last task for your account." : "This is first task for your account.",
                    { variant: 'error' }
                )
            }
        } catch (err) {
            console.error(err)
        }
    }

    const onGoSummary = () => {
        push({
            pathname: PATH_ROUTE.qaTool.root,
        });
    }

    return (
        <Page title="Futureverse: QA Dashboard">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                {!loading && data?.qaTask ?
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <ImageGallery
                                assets={data.qaTask?.renderedAssets || []}
                                frames={framesData?.renderedAssets || []}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <QAPanel
                                handleNavigate={handleNavigate}
                                data={data.qaTask}
                                failing={taskFailing}
                                approving={taskApproving}
                                reseting={taskReseting}
                                isChangeAccess={true}
                                handleQATaskFail={handleQATaskFail}
                                handleQATaskApprove={handleQATaskApprove}
                                handleQATaskReset={handleQATaskReset}
                                onGoSummary={onGoSummary}
                            />
                        </Grid>
                    </Grid> : <DataLoadingScreen />
                }
            </Container>
        </Page>
    );
}