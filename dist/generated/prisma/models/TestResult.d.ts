import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TestResultModel = runtime.Types.Result.DefaultSelection<Prisma.$TestResultPayload>;
export type AggregateTestResult = {
    _count: TestResultCountAggregateOutputType | null;
    _avg: TestResultAvgAggregateOutputType | null;
    _sum: TestResultSumAggregateOutputType | null;
    _min: TestResultMinAggregateOutputType | null;
    _max: TestResultMaxAggregateOutputType | null;
};
export type TestResultAvgAggregateOutputType = {
    duration: number | null;
};
export type TestResultSumAggregateOutputType = {
    duration: number | null;
};
export type TestResultMinAggregateOutputType = {
    id: string | null;
    testCaseId: string | null;
    status: $Enums.TestResultStatus | null;
    executedAt: Date | null;
    duration: number | null;
    notes: string | null;
    createdAt: Date | null;
};
export type TestResultMaxAggregateOutputType = {
    id: string | null;
    testCaseId: string | null;
    status: $Enums.TestResultStatus | null;
    executedAt: Date | null;
    duration: number | null;
    notes: string | null;
    createdAt: Date | null;
};
export type TestResultCountAggregateOutputType = {
    id: number;
    testCaseId: number;
    status: number;
    executedAt: number;
    duration: number;
    notes: number;
    createdAt: number;
    _all: number;
};
export type TestResultAvgAggregateInputType = {
    duration?: true;
};
export type TestResultSumAggregateInputType = {
    duration?: true;
};
export type TestResultMinAggregateInputType = {
    id?: true;
    testCaseId?: true;
    status?: true;
    executedAt?: true;
    duration?: true;
    notes?: true;
    createdAt?: true;
};
export type TestResultMaxAggregateInputType = {
    id?: true;
    testCaseId?: true;
    status?: true;
    executedAt?: true;
    duration?: true;
    notes?: true;
    createdAt?: true;
};
export type TestResultCountAggregateInputType = {
    id?: true;
    testCaseId?: true;
    status?: true;
    executedAt?: true;
    duration?: true;
    notes?: true;
    createdAt?: true;
    _all?: true;
};
export type TestResultAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TestResultWhereInput;
    orderBy?: Prisma.TestResultOrderByWithRelationInput | Prisma.TestResultOrderByWithRelationInput[];
    cursor?: Prisma.TestResultWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TestResultCountAggregateInputType;
    _avg?: TestResultAvgAggregateInputType;
    _sum?: TestResultSumAggregateInputType;
    _min?: TestResultMinAggregateInputType;
    _max?: TestResultMaxAggregateInputType;
};
export type GetTestResultAggregateType<T extends TestResultAggregateArgs> = {
    [P in keyof T & keyof AggregateTestResult]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTestResult[P]> : Prisma.GetScalarType<T[P], AggregateTestResult[P]>;
};
export type TestResultGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TestResultWhereInput;
    orderBy?: Prisma.TestResultOrderByWithAggregationInput | Prisma.TestResultOrderByWithAggregationInput[];
    by: Prisma.TestResultScalarFieldEnum[] | Prisma.TestResultScalarFieldEnum;
    having?: Prisma.TestResultScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TestResultCountAggregateInputType | true;
    _avg?: TestResultAvgAggregateInputType;
    _sum?: TestResultSumAggregateInputType;
    _min?: TestResultMinAggregateInputType;
    _max?: TestResultMaxAggregateInputType;
};
export type TestResultGroupByOutputType = {
    id: string;
    testCaseId: string;
    status: $Enums.TestResultStatus;
    executedAt: Date;
    duration: number | null;
    notes: string | null;
    createdAt: Date;
    _count: TestResultCountAggregateOutputType | null;
    _avg: TestResultAvgAggregateOutputType | null;
    _sum: TestResultSumAggregateOutputType | null;
    _min: TestResultMinAggregateOutputType | null;
    _max: TestResultMaxAggregateOutputType | null;
};
export type GetTestResultGroupByPayload<T extends TestResultGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TestResultGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TestResultGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TestResultGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TestResultGroupByOutputType[P]>;
}>>;
export type TestResultWhereInput = {
    AND?: Prisma.TestResultWhereInput | Prisma.TestResultWhereInput[];
    OR?: Prisma.TestResultWhereInput[];
    NOT?: Prisma.TestResultWhereInput | Prisma.TestResultWhereInput[];
    id?: Prisma.StringFilter<"TestResult"> | string;
    testCaseId?: Prisma.StringFilter<"TestResult"> | string;
    status?: Prisma.EnumTestResultStatusFilter<"TestResult"> | $Enums.TestResultStatus;
    executedAt?: Prisma.DateTimeFilter<"TestResult"> | Date | string;
    duration?: Prisma.IntNullableFilter<"TestResult"> | number | null;
    notes?: Prisma.StringNullableFilter<"TestResult"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"TestResult"> | Date | string;
    testCase?: Prisma.XOR<Prisma.TestCaseScalarRelationFilter, Prisma.TestCaseWhereInput>;
};
export type TestResultOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    testCaseId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    executedAt?: Prisma.SortOrder;
    duration?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    testCase?: Prisma.TestCaseOrderByWithRelationInput;
};
export type TestResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TestResultWhereInput | Prisma.TestResultWhereInput[];
    OR?: Prisma.TestResultWhereInput[];
    NOT?: Prisma.TestResultWhereInput | Prisma.TestResultWhereInput[];
    testCaseId?: Prisma.StringFilter<"TestResult"> | string;
    status?: Prisma.EnumTestResultStatusFilter<"TestResult"> | $Enums.TestResultStatus;
    executedAt?: Prisma.DateTimeFilter<"TestResult"> | Date | string;
    duration?: Prisma.IntNullableFilter<"TestResult"> | number | null;
    notes?: Prisma.StringNullableFilter<"TestResult"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"TestResult"> | Date | string;
    testCase?: Prisma.XOR<Prisma.TestCaseScalarRelationFilter, Prisma.TestCaseWhereInput>;
}, "id">;
export type TestResultOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    testCaseId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    executedAt?: Prisma.SortOrder;
    duration?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.TestResultCountOrderByAggregateInput;
    _avg?: Prisma.TestResultAvgOrderByAggregateInput;
    _max?: Prisma.TestResultMaxOrderByAggregateInput;
    _min?: Prisma.TestResultMinOrderByAggregateInput;
    _sum?: Prisma.TestResultSumOrderByAggregateInput;
};
export type TestResultScalarWhereWithAggregatesInput = {
    AND?: Prisma.TestResultScalarWhereWithAggregatesInput | Prisma.TestResultScalarWhereWithAggregatesInput[];
    OR?: Prisma.TestResultScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TestResultScalarWhereWithAggregatesInput | Prisma.TestResultScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"TestResult"> | string;
    testCaseId?: Prisma.StringWithAggregatesFilter<"TestResult"> | string;
    status?: Prisma.EnumTestResultStatusWithAggregatesFilter<"TestResult"> | $Enums.TestResultStatus;
    executedAt?: Prisma.DateTimeWithAggregatesFilter<"TestResult"> | Date | string;
    duration?: Prisma.IntNullableWithAggregatesFilter<"TestResult"> | number | null;
    notes?: Prisma.StringNullableWithAggregatesFilter<"TestResult"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"TestResult"> | Date | string;
};
export type TestResultCreateInput = {
    id?: string;
    status: $Enums.TestResultStatus;
    executedAt?: Date | string;
    duration?: number | null;
    notes?: string | null;
    createdAt?: Date | string;
    testCase: Prisma.TestCaseCreateNestedOneWithoutTestResultsInput;
};
export type TestResultUncheckedCreateInput = {
    id?: string;
    testCaseId: string;
    status: $Enums.TestResultStatus;
    executedAt?: Date | string;
    duration?: number | null;
    notes?: string | null;
    createdAt?: Date | string;
};
export type TestResultUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTestResultStatusFieldUpdateOperationsInput | $Enums.TestResultStatus;
    executedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    testCase?: Prisma.TestCaseUpdateOneRequiredWithoutTestResultsNestedInput;
};
export type TestResultUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    testCaseId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTestResultStatusFieldUpdateOperationsInput | $Enums.TestResultStatus;
    executedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TestResultCreateManyInput = {
    id?: string;
    testCaseId: string;
    status: $Enums.TestResultStatus;
    executedAt?: Date | string;
    duration?: number | null;
    notes?: string | null;
    createdAt?: Date | string;
};
export type TestResultUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTestResultStatusFieldUpdateOperationsInput | $Enums.TestResultStatus;
    executedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TestResultUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    testCaseId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTestResultStatusFieldUpdateOperationsInput | $Enums.TestResultStatus;
    executedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TestResultListRelationFilter = {
    every?: Prisma.TestResultWhereInput;
    some?: Prisma.TestResultWhereInput;
    none?: Prisma.TestResultWhereInput;
};
export type TestResultOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TestResultCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    testCaseId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    executedAt?: Prisma.SortOrder;
    duration?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TestResultAvgOrderByAggregateInput = {
    duration?: Prisma.SortOrder;
};
export type TestResultMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    testCaseId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    executedAt?: Prisma.SortOrder;
    duration?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TestResultMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    testCaseId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    executedAt?: Prisma.SortOrder;
    duration?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TestResultSumOrderByAggregateInput = {
    duration?: Prisma.SortOrder;
};
export type TestResultCreateNestedManyWithoutTestCaseInput = {
    create?: Prisma.XOR<Prisma.TestResultCreateWithoutTestCaseInput, Prisma.TestResultUncheckedCreateWithoutTestCaseInput> | Prisma.TestResultCreateWithoutTestCaseInput[] | Prisma.TestResultUncheckedCreateWithoutTestCaseInput[];
    connectOrCreate?: Prisma.TestResultCreateOrConnectWithoutTestCaseInput | Prisma.TestResultCreateOrConnectWithoutTestCaseInput[];
    createMany?: Prisma.TestResultCreateManyTestCaseInputEnvelope;
    connect?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
};
export type TestResultUncheckedCreateNestedManyWithoutTestCaseInput = {
    create?: Prisma.XOR<Prisma.TestResultCreateWithoutTestCaseInput, Prisma.TestResultUncheckedCreateWithoutTestCaseInput> | Prisma.TestResultCreateWithoutTestCaseInput[] | Prisma.TestResultUncheckedCreateWithoutTestCaseInput[];
    connectOrCreate?: Prisma.TestResultCreateOrConnectWithoutTestCaseInput | Prisma.TestResultCreateOrConnectWithoutTestCaseInput[];
    createMany?: Prisma.TestResultCreateManyTestCaseInputEnvelope;
    connect?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
};
export type TestResultUpdateManyWithoutTestCaseNestedInput = {
    create?: Prisma.XOR<Prisma.TestResultCreateWithoutTestCaseInput, Prisma.TestResultUncheckedCreateWithoutTestCaseInput> | Prisma.TestResultCreateWithoutTestCaseInput[] | Prisma.TestResultUncheckedCreateWithoutTestCaseInput[];
    connectOrCreate?: Prisma.TestResultCreateOrConnectWithoutTestCaseInput | Prisma.TestResultCreateOrConnectWithoutTestCaseInput[];
    upsert?: Prisma.TestResultUpsertWithWhereUniqueWithoutTestCaseInput | Prisma.TestResultUpsertWithWhereUniqueWithoutTestCaseInput[];
    createMany?: Prisma.TestResultCreateManyTestCaseInputEnvelope;
    set?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    disconnect?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    delete?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    connect?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    update?: Prisma.TestResultUpdateWithWhereUniqueWithoutTestCaseInput | Prisma.TestResultUpdateWithWhereUniqueWithoutTestCaseInput[];
    updateMany?: Prisma.TestResultUpdateManyWithWhereWithoutTestCaseInput | Prisma.TestResultUpdateManyWithWhereWithoutTestCaseInput[];
    deleteMany?: Prisma.TestResultScalarWhereInput | Prisma.TestResultScalarWhereInput[];
};
export type TestResultUncheckedUpdateManyWithoutTestCaseNestedInput = {
    create?: Prisma.XOR<Prisma.TestResultCreateWithoutTestCaseInput, Prisma.TestResultUncheckedCreateWithoutTestCaseInput> | Prisma.TestResultCreateWithoutTestCaseInput[] | Prisma.TestResultUncheckedCreateWithoutTestCaseInput[];
    connectOrCreate?: Prisma.TestResultCreateOrConnectWithoutTestCaseInput | Prisma.TestResultCreateOrConnectWithoutTestCaseInput[];
    upsert?: Prisma.TestResultUpsertWithWhereUniqueWithoutTestCaseInput | Prisma.TestResultUpsertWithWhereUniqueWithoutTestCaseInput[];
    createMany?: Prisma.TestResultCreateManyTestCaseInputEnvelope;
    set?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    disconnect?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    delete?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    connect?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    update?: Prisma.TestResultUpdateWithWhereUniqueWithoutTestCaseInput | Prisma.TestResultUpdateWithWhereUniqueWithoutTestCaseInput[];
    updateMany?: Prisma.TestResultUpdateManyWithWhereWithoutTestCaseInput | Prisma.TestResultUpdateManyWithWhereWithoutTestCaseInput[];
    deleteMany?: Prisma.TestResultScalarWhereInput | Prisma.TestResultScalarWhereInput[];
};
export type EnumTestResultStatusFieldUpdateOperationsInput = {
    set?: $Enums.TestResultStatus;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type TestResultCreateWithoutTestCaseInput = {
    id?: string;
    status: $Enums.TestResultStatus;
    executedAt?: Date | string;
    duration?: number | null;
    notes?: string | null;
    createdAt?: Date | string;
};
export type TestResultUncheckedCreateWithoutTestCaseInput = {
    id?: string;
    status: $Enums.TestResultStatus;
    executedAt?: Date | string;
    duration?: number | null;
    notes?: string | null;
    createdAt?: Date | string;
};
export type TestResultCreateOrConnectWithoutTestCaseInput = {
    where: Prisma.TestResultWhereUniqueInput;
    create: Prisma.XOR<Prisma.TestResultCreateWithoutTestCaseInput, Prisma.TestResultUncheckedCreateWithoutTestCaseInput>;
};
export type TestResultCreateManyTestCaseInputEnvelope = {
    data: Prisma.TestResultCreateManyTestCaseInput | Prisma.TestResultCreateManyTestCaseInput[];
    skipDuplicates?: boolean;
};
export type TestResultUpsertWithWhereUniqueWithoutTestCaseInput = {
    where: Prisma.TestResultWhereUniqueInput;
    update: Prisma.XOR<Prisma.TestResultUpdateWithoutTestCaseInput, Prisma.TestResultUncheckedUpdateWithoutTestCaseInput>;
    create: Prisma.XOR<Prisma.TestResultCreateWithoutTestCaseInput, Prisma.TestResultUncheckedCreateWithoutTestCaseInput>;
};
export type TestResultUpdateWithWhereUniqueWithoutTestCaseInput = {
    where: Prisma.TestResultWhereUniqueInput;
    data: Prisma.XOR<Prisma.TestResultUpdateWithoutTestCaseInput, Prisma.TestResultUncheckedUpdateWithoutTestCaseInput>;
};
export type TestResultUpdateManyWithWhereWithoutTestCaseInput = {
    where: Prisma.TestResultScalarWhereInput;
    data: Prisma.XOR<Prisma.TestResultUpdateManyMutationInput, Prisma.TestResultUncheckedUpdateManyWithoutTestCaseInput>;
};
export type TestResultScalarWhereInput = {
    AND?: Prisma.TestResultScalarWhereInput | Prisma.TestResultScalarWhereInput[];
    OR?: Prisma.TestResultScalarWhereInput[];
    NOT?: Prisma.TestResultScalarWhereInput | Prisma.TestResultScalarWhereInput[];
    id?: Prisma.StringFilter<"TestResult"> | string;
    testCaseId?: Prisma.StringFilter<"TestResult"> | string;
    status?: Prisma.EnumTestResultStatusFilter<"TestResult"> | $Enums.TestResultStatus;
    executedAt?: Prisma.DateTimeFilter<"TestResult"> | Date | string;
    duration?: Prisma.IntNullableFilter<"TestResult"> | number | null;
    notes?: Prisma.StringNullableFilter<"TestResult"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"TestResult"> | Date | string;
};
export type TestResultCreateManyTestCaseInput = {
    id?: string;
    status: $Enums.TestResultStatus;
    executedAt?: Date | string;
    duration?: number | null;
    notes?: string | null;
    createdAt?: Date | string;
};
export type TestResultUpdateWithoutTestCaseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTestResultStatusFieldUpdateOperationsInput | $Enums.TestResultStatus;
    executedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TestResultUncheckedUpdateWithoutTestCaseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTestResultStatusFieldUpdateOperationsInput | $Enums.TestResultStatus;
    executedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TestResultUncheckedUpdateManyWithoutTestCaseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTestResultStatusFieldUpdateOperationsInput | $Enums.TestResultStatus;
    executedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TestResultSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    testCaseId?: boolean;
    status?: boolean;
    executedAt?: boolean;
    duration?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    testCase?: boolean | Prisma.TestCaseDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["testResult"]>;
export type TestResultSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    testCaseId?: boolean;
    status?: boolean;
    executedAt?: boolean;
    duration?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    testCase?: boolean | Prisma.TestCaseDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["testResult"]>;
export type TestResultSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    testCaseId?: boolean;
    status?: boolean;
    executedAt?: boolean;
    duration?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    testCase?: boolean | Prisma.TestCaseDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["testResult"]>;
export type TestResultSelectScalar = {
    id?: boolean;
    testCaseId?: boolean;
    status?: boolean;
    executedAt?: boolean;
    duration?: boolean;
    notes?: boolean;
    createdAt?: boolean;
};
export type TestResultOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "testCaseId" | "status" | "executedAt" | "duration" | "notes" | "createdAt", ExtArgs["result"]["testResult"]>;
export type TestResultInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    testCase?: boolean | Prisma.TestCaseDefaultArgs<ExtArgs>;
};
export type TestResultIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    testCase?: boolean | Prisma.TestCaseDefaultArgs<ExtArgs>;
};
export type TestResultIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    testCase?: boolean | Prisma.TestCaseDefaultArgs<ExtArgs>;
};
export type $TestResultPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TestResult";
    objects: {
        testCase: Prisma.$TestCasePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        testCaseId: string;
        status: $Enums.TestResultStatus;
        executedAt: Date;
        duration: number | null;
        notes: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["testResult"]>;
    composites: {};
};
export type TestResultGetPayload<S extends boolean | null | undefined | TestResultDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TestResultPayload, S>;
export type TestResultCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TestResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TestResultCountAggregateInputType | true;
};
export interface TestResultDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TestResult'];
        meta: {
            name: 'TestResult';
        };
    };
    findUnique<T extends TestResultFindUniqueArgs>(args: Prisma.SelectSubset<T, TestResultFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TestResultClient<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TestResultFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TestResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TestResultClient<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TestResultFindFirstArgs>(args?: Prisma.SelectSubset<T, TestResultFindFirstArgs<ExtArgs>>): Prisma.Prisma__TestResultClient<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TestResultFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TestResultFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TestResultClient<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TestResultFindManyArgs>(args?: Prisma.SelectSubset<T, TestResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TestResultCreateArgs>(args: Prisma.SelectSubset<T, TestResultCreateArgs<ExtArgs>>): Prisma.Prisma__TestResultClient<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TestResultCreateManyArgs>(args?: Prisma.SelectSubset<T, TestResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TestResultCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TestResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TestResultDeleteArgs>(args: Prisma.SelectSubset<T, TestResultDeleteArgs<ExtArgs>>): Prisma.Prisma__TestResultClient<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TestResultUpdateArgs>(args: Prisma.SelectSubset<T, TestResultUpdateArgs<ExtArgs>>): Prisma.Prisma__TestResultClient<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TestResultDeleteManyArgs>(args?: Prisma.SelectSubset<T, TestResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TestResultUpdateManyArgs>(args: Prisma.SelectSubset<T, TestResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TestResultUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TestResultUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TestResultUpsertArgs>(args: Prisma.SelectSubset<T, TestResultUpsertArgs<ExtArgs>>): Prisma.Prisma__TestResultClient<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TestResultCountArgs>(args?: Prisma.Subset<T, TestResultCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TestResultCountAggregateOutputType> : number>;
    aggregate<T extends TestResultAggregateArgs>(args: Prisma.Subset<T, TestResultAggregateArgs>): Prisma.PrismaPromise<GetTestResultAggregateType<T>>;
    groupBy<T extends TestResultGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TestResultGroupByArgs['orderBy'];
    } : {
        orderBy?: TestResultGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TestResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TestResultFieldRefs;
}
export interface Prisma__TestResultClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    testCase<T extends Prisma.TestCaseDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TestCaseDefaultArgs<ExtArgs>>): Prisma.Prisma__TestCaseClient<runtime.Types.Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TestResultFieldRefs {
    readonly id: Prisma.FieldRef<"TestResult", 'String'>;
    readonly testCaseId: Prisma.FieldRef<"TestResult", 'String'>;
    readonly status: Prisma.FieldRef<"TestResult", 'TestResultStatus'>;
    readonly executedAt: Prisma.FieldRef<"TestResult", 'DateTime'>;
    readonly duration: Prisma.FieldRef<"TestResult", 'Int'>;
    readonly notes: Prisma.FieldRef<"TestResult", 'String'>;
    readonly createdAt: Prisma.FieldRef<"TestResult", 'DateTime'>;
}
export type TestResultFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelect<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    include?: Prisma.TestResultInclude<ExtArgs> | null;
    where: Prisma.TestResultWhereUniqueInput;
};
export type TestResultFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelect<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    include?: Prisma.TestResultInclude<ExtArgs> | null;
    where: Prisma.TestResultWhereUniqueInput;
};
export type TestResultFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelect<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    include?: Prisma.TestResultInclude<ExtArgs> | null;
    where?: Prisma.TestResultWhereInput;
    orderBy?: Prisma.TestResultOrderByWithRelationInput | Prisma.TestResultOrderByWithRelationInput[];
    cursor?: Prisma.TestResultWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TestResultScalarFieldEnum | Prisma.TestResultScalarFieldEnum[];
};
export type TestResultFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelect<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    include?: Prisma.TestResultInclude<ExtArgs> | null;
    where?: Prisma.TestResultWhereInput;
    orderBy?: Prisma.TestResultOrderByWithRelationInput | Prisma.TestResultOrderByWithRelationInput[];
    cursor?: Prisma.TestResultWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TestResultScalarFieldEnum | Prisma.TestResultScalarFieldEnum[];
};
export type TestResultFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelect<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    include?: Prisma.TestResultInclude<ExtArgs> | null;
    where?: Prisma.TestResultWhereInput;
    orderBy?: Prisma.TestResultOrderByWithRelationInput | Prisma.TestResultOrderByWithRelationInput[];
    cursor?: Prisma.TestResultWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TestResultScalarFieldEnum | Prisma.TestResultScalarFieldEnum[];
};
export type TestResultCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelect<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    include?: Prisma.TestResultInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TestResultCreateInput, Prisma.TestResultUncheckedCreateInput>;
};
export type TestResultCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TestResultCreateManyInput | Prisma.TestResultCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TestResultCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    data: Prisma.TestResultCreateManyInput | Prisma.TestResultCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TestResultIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TestResultUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelect<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    include?: Prisma.TestResultInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TestResultUpdateInput, Prisma.TestResultUncheckedUpdateInput>;
    where: Prisma.TestResultWhereUniqueInput;
};
export type TestResultUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TestResultUpdateManyMutationInput, Prisma.TestResultUncheckedUpdateManyInput>;
    where?: Prisma.TestResultWhereInput;
    limit?: number;
};
export type TestResultUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TestResultUpdateManyMutationInput, Prisma.TestResultUncheckedUpdateManyInput>;
    where?: Prisma.TestResultWhereInput;
    limit?: number;
    include?: Prisma.TestResultIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TestResultUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelect<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    include?: Prisma.TestResultInclude<ExtArgs> | null;
    where: Prisma.TestResultWhereUniqueInput;
    create: Prisma.XOR<Prisma.TestResultCreateInput, Prisma.TestResultUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TestResultUpdateInput, Prisma.TestResultUncheckedUpdateInput>;
};
export type TestResultDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelect<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    include?: Prisma.TestResultInclude<ExtArgs> | null;
    where: Prisma.TestResultWhereUniqueInput;
};
export type TestResultDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TestResultWhereInput;
    limit?: number;
};
export type TestResultDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelect<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    include?: Prisma.TestResultInclude<ExtArgs> | null;
};
