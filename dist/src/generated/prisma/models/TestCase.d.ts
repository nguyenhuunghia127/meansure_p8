import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TestCaseModel = runtime.Types.Result.DefaultSelection<Prisma.$TestCasePayload>;
export type AggregateTestCase = {
    _count: TestCaseCountAggregateOutputType | null;
    _min: TestCaseMinAggregateOutputType | null;
    _max: TestCaseMaxAggregateOutputType | null;
};
export type TestCaseMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    moduleId: string | null;
    priority: $Enums.Priority | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TestCaseMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    moduleId: string | null;
    priority: $Enums.Priority | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TestCaseCountAggregateOutputType = {
    id: number;
    title: number;
    moduleId: number;
    priority: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type TestCaseMinAggregateInputType = {
    id?: true;
    title?: true;
    moduleId?: true;
    priority?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TestCaseMaxAggregateInputType = {
    id?: true;
    title?: true;
    moduleId?: true;
    priority?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TestCaseCountAggregateInputType = {
    id?: true;
    title?: true;
    moduleId?: true;
    priority?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type TestCaseAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TestCaseWhereInput;
    orderBy?: Prisma.TestCaseOrderByWithRelationInput | Prisma.TestCaseOrderByWithRelationInput[];
    cursor?: Prisma.TestCaseWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TestCaseCountAggregateInputType;
    _min?: TestCaseMinAggregateInputType;
    _max?: TestCaseMaxAggregateInputType;
};
export type GetTestCaseAggregateType<T extends TestCaseAggregateArgs> = {
    [P in keyof T & keyof AggregateTestCase]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTestCase[P]> : Prisma.GetScalarType<T[P], AggregateTestCase[P]>;
};
export type TestCaseGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TestCaseWhereInput;
    orderBy?: Prisma.TestCaseOrderByWithAggregationInput | Prisma.TestCaseOrderByWithAggregationInput[];
    by: Prisma.TestCaseScalarFieldEnum[] | Prisma.TestCaseScalarFieldEnum;
    having?: Prisma.TestCaseScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TestCaseCountAggregateInputType | true;
    _min?: TestCaseMinAggregateInputType;
    _max?: TestCaseMaxAggregateInputType;
};
export type TestCaseGroupByOutputType = {
    id: string;
    title: string;
    moduleId: string;
    priority: $Enums.Priority;
    createdAt: Date;
    updatedAt: Date;
    _count: TestCaseCountAggregateOutputType | null;
    _min: TestCaseMinAggregateOutputType | null;
    _max: TestCaseMaxAggregateOutputType | null;
};
export type GetTestCaseGroupByPayload<T extends TestCaseGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TestCaseGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TestCaseGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TestCaseGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TestCaseGroupByOutputType[P]>;
}>>;
export type TestCaseWhereInput = {
    AND?: Prisma.TestCaseWhereInput | Prisma.TestCaseWhereInput[];
    OR?: Prisma.TestCaseWhereInput[];
    NOT?: Prisma.TestCaseWhereInput | Prisma.TestCaseWhereInput[];
    id?: Prisma.StringFilter<"TestCase"> | string;
    title?: Prisma.StringFilter<"TestCase"> | string;
    moduleId?: Prisma.StringFilter<"TestCase"> | string;
    priority?: Prisma.EnumPriorityFilter<"TestCase"> | $Enums.Priority;
    createdAt?: Prisma.DateTimeFilter<"TestCase"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TestCase"> | Date | string;
    module?: Prisma.XOR<Prisma.ModuleScalarRelationFilter, Prisma.ModuleWhereInput>;
    testResults?: Prisma.TestResultListRelationFilter;
};
export type TestCaseOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    moduleId?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    module?: Prisma.ModuleOrderByWithRelationInput;
    testResults?: Prisma.TestResultOrderByRelationAggregateInput;
};
export type TestCaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TestCaseWhereInput | Prisma.TestCaseWhereInput[];
    OR?: Prisma.TestCaseWhereInput[];
    NOT?: Prisma.TestCaseWhereInput | Prisma.TestCaseWhereInput[];
    title?: Prisma.StringFilter<"TestCase"> | string;
    moduleId?: Prisma.StringFilter<"TestCase"> | string;
    priority?: Prisma.EnumPriorityFilter<"TestCase"> | $Enums.Priority;
    createdAt?: Prisma.DateTimeFilter<"TestCase"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TestCase"> | Date | string;
    module?: Prisma.XOR<Prisma.ModuleScalarRelationFilter, Prisma.ModuleWhereInput>;
    testResults?: Prisma.TestResultListRelationFilter;
}, "id">;
export type TestCaseOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    moduleId?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.TestCaseCountOrderByAggregateInput;
    _max?: Prisma.TestCaseMaxOrderByAggregateInput;
    _min?: Prisma.TestCaseMinOrderByAggregateInput;
};
export type TestCaseScalarWhereWithAggregatesInput = {
    AND?: Prisma.TestCaseScalarWhereWithAggregatesInput | Prisma.TestCaseScalarWhereWithAggregatesInput[];
    OR?: Prisma.TestCaseScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TestCaseScalarWhereWithAggregatesInput | Prisma.TestCaseScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"TestCase"> | string;
    title?: Prisma.StringWithAggregatesFilter<"TestCase"> | string;
    moduleId?: Prisma.StringWithAggregatesFilter<"TestCase"> | string;
    priority?: Prisma.EnumPriorityWithAggregatesFilter<"TestCase"> | $Enums.Priority;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"TestCase"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"TestCase"> | Date | string;
};
export type TestCaseCreateInput = {
    id?: string;
    title: string;
    priority?: $Enums.Priority;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    module: Prisma.ModuleCreateNestedOneWithoutTestCasesInput;
    testResults?: Prisma.TestResultCreateNestedManyWithoutTestCaseInput;
};
export type TestCaseUncheckedCreateInput = {
    id?: string;
    title: string;
    moduleId: string;
    priority?: $Enums.Priority;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    testResults?: Prisma.TestResultUncheckedCreateNestedManyWithoutTestCaseInput;
};
export type TestCaseUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.EnumPriorityFieldUpdateOperationsInput | $Enums.Priority;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    module?: Prisma.ModuleUpdateOneRequiredWithoutTestCasesNestedInput;
    testResults?: Prisma.TestResultUpdateManyWithoutTestCaseNestedInput;
};
export type TestCaseUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleId?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.EnumPriorityFieldUpdateOperationsInput | $Enums.Priority;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    testResults?: Prisma.TestResultUncheckedUpdateManyWithoutTestCaseNestedInput;
};
export type TestCaseCreateManyInput = {
    id?: string;
    title: string;
    moduleId: string;
    priority?: $Enums.Priority;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TestCaseUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.EnumPriorityFieldUpdateOperationsInput | $Enums.Priority;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TestCaseUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleId?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.EnumPriorityFieldUpdateOperationsInput | $Enums.Priority;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TestCaseListRelationFilter = {
    every?: Prisma.TestCaseWhereInput;
    some?: Prisma.TestCaseWhereInput;
    none?: Prisma.TestCaseWhereInput;
};
export type TestCaseOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TestCaseCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    moduleId?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TestCaseMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    moduleId?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TestCaseMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    moduleId?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TestCaseScalarRelationFilter = {
    is?: Prisma.TestCaseWhereInput;
    isNot?: Prisma.TestCaseWhereInput;
};
export type TestCaseCreateNestedManyWithoutModuleInput = {
    create?: Prisma.XOR<Prisma.TestCaseCreateWithoutModuleInput, Prisma.TestCaseUncheckedCreateWithoutModuleInput> | Prisma.TestCaseCreateWithoutModuleInput[] | Prisma.TestCaseUncheckedCreateWithoutModuleInput[];
    connectOrCreate?: Prisma.TestCaseCreateOrConnectWithoutModuleInput | Prisma.TestCaseCreateOrConnectWithoutModuleInput[];
    createMany?: Prisma.TestCaseCreateManyModuleInputEnvelope;
    connect?: Prisma.TestCaseWhereUniqueInput | Prisma.TestCaseWhereUniqueInput[];
};
export type TestCaseUncheckedCreateNestedManyWithoutModuleInput = {
    create?: Prisma.XOR<Prisma.TestCaseCreateWithoutModuleInput, Prisma.TestCaseUncheckedCreateWithoutModuleInput> | Prisma.TestCaseCreateWithoutModuleInput[] | Prisma.TestCaseUncheckedCreateWithoutModuleInput[];
    connectOrCreate?: Prisma.TestCaseCreateOrConnectWithoutModuleInput | Prisma.TestCaseCreateOrConnectWithoutModuleInput[];
    createMany?: Prisma.TestCaseCreateManyModuleInputEnvelope;
    connect?: Prisma.TestCaseWhereUniqueInput | Prisma.TestCaseWhereUniqueInput[];
};
export type TestCaseUpdateManyWithoutModuleNestedInput = {
    create?: Prisma.XOR<Prisma.TestCaseCreateWithoutModuleInput, Prisma.TestCaseUncheckedCreateWithoutModuleInput> | Prisma.TestCaseCreateWithoutModuleInput[] | Prisma.TestCaseUncheckedCreateWithoutModuleInput[];
    connectOrCreate?: Prisma.TestCaseCreateOrConnectWithoutModuleInput | Prisma.TestCaseCreateOrConnectWithoutModuleInput[];
    upsert?: Prisma.TestCaseUpsertWithWhereUniqueWithoutModuleInput | Prisma.TestCaseUpsertWithWhereUniqueWithoutModuleInput[];
    createMany?: Prisma.TestCaseCreateManyModuleInputEnvelope;
    set?: Prisma.TestCaseWhereUniqueInput | Prisma.TestCaseWhereUniqueInput[];
    disconnect?: Prisma.TestCaseWhereUniqueInput | Prisma.TestCaseWhereUniqueInput[];
    delete?: Prisma.TestCaseWhereUniqueInput | Prisma.TestCaseWhereUniqueInput[];
    connect?: Prisma.TestCaseWhereUniqueInput | Prisma.TestCaseWhereUniqueInput[];
    update?: Prisma.TestCaseUpdateWithWhereUniqueWithoutModuleInput | Prisma.TestCaseUpdateWithWhereUniqueWithoutModuleInput[];
    updateMany?: Prisma.TestCaseUpdateManyWithWhereWithoutModuleInput | Prisma.TestCaseUpdateManyWithWhereWithoutModuleInput[];
    deleteMany?: Prisma.TestCaseScalarWhereInput | Prisma.TestCaseScalarWhereInput[];
};
export type TestCaseUncheckedUpdateManyWithoutModuleNestedInput = {
    create?: Prisma.XOR<Prisma.TestCaseCreateWithoutModuleInput, Prisma.TestCaseUncheckedCreateWithoutModuleInput> | Prisma.TestCaseCreateWithoutModuleInput[] | Prisma.TestCaseUncheckedCreateWithoutModuleInput[];
    connectOrCreate?: Prisma.TestCaseCreateOrConnectWithoutModuleInput | Prisma.TestCaseCreateOrConnectWithoutModuleInput[];
    upsert?: Prisma.TestCaseUpsertWithWhereUniqueWithoutModuleInput | Prisma.TestCaseUpsertWithWhereUniqueWithoutModuleInput[];
    createMany?: Prisma.TestCaseCreateManyModuleInputEnvelope;
    set?: Prisma.TestCaseWhereUniqueInput | Prisma.TestCaseWhereUniqueInput[];
    disconnect?: Prisma.TestCaseWhereUniqueInput | Prisma.TestCaseWhereUniqueInput[];
    delete?: Prisma.TestCaseWhereUniqueInput | Prisma.TestCaseWhereUniqueInput[];
    connect?: Prisma.TestCaseWhereUniqueInput | Prisma.TestCaseWhereUniqueInput[];
    update?: Prisma.TestCaseUpdateWithWhereUniqueWithoutModuleInput | Prisma.TestCaseUpdateWithWhereUniqueWithoutModuleInput[];
    updateMany?: Prisma.TestCaseUpdateManyWithWhereWithoutModuleInput | Prisma.TestCaseUpdateManyWithWhereWithoutModuleInput[];
    deleteMany?: Prisma.TestCaseScalarWhereInput | Prisma.TestCaseScalarWhereInput[];
};
export type EnumPriorityFieldUpdateOperationsInput = {
    set?: $Enums.Priority;
};
export type TestCaseCreateNestedOneWithoutTestResultsInput = {
    create?: Prisma.XOR<Prisma.TestCaseCreateWithoutTestResultsInput, Prisma.TestCaseUncheckedCreateWithoutTestResultsInput>;
    connectOrCreate?: Prisma.TestCaseCreateOrConnectWithoutTestResultsInput;
    connect?: Prisma.TestCaseWhereUniqueInput;
};
export type TestCaseUpdateOneRequiredWithoutTestResultsNestedInput = {
    create?: Prisma.XOR<Prisma.TestCaseCreateWithoutTestResultsInput, Prisma.TestCaseUncheckedCreateWithoutTestResultsInput>;
    connectOrCreate?: Prisma.TestCaseCreateOrConnectWithoutTestResultsInput;
    upsert?: Prisma.TestCaseUpsertWithoutTestResultsInput;
    connect?: Prisma.TestCaseWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TestCaseUpdateToOneWithWhereWithoutTestResultsInput, Prisma.TestCaseUpdateWithoutTestResultsInput>, Prisma.TestCaseUncheckedUpdateWithoutTestResultsInput>;
};
export type TestCaseCreateWithoutModuleInput = {
    id?: string;
    title: string;
    priority?: $Enums.Priority;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    testResults?: Prisma.TestResultCreateNestedManyWithoutTestCaseInput;
};
export type TestCaseUncheckedCreateWithoutModuleInput = {
    id?: string;
    title: string;
    priority?: $Enums.Priority;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    testResults?: Prisma.TestResultUncheckedCreateNestedManyWithoutTestCaseInput;
};
export type TestCaseCreateOrConnectWithoutModuleInput = {
    where: Prisma.TestCaseWhereUniqueInput;
    create: Prisma.XOR<Prisma.TestCaseCreateWithoutModuleInput, Prisma.TestCaseUncheckedCreateWithoutModuleInput>;
};
export type TestCaseCreateManyModuleInputEnvelope = {
    data: Prisma.TestCaseCreateManyModuleInput | Prisma.TestCaseCreateManyModuleInput[];
    skipDuplicates?: boolean;
};
export type TestCaseUpsertWithWhereUniqueWithoutModuleInput = {
    where: Prisma.TestCaseWhereUniqueInput;
    update: Prisma.XOR<Prisma.TestCaseUpdateWithoutModuleInput, Prisma.TestCaseUncheckedUpdateWithoutModuleInput>;
    create: Prisma.XOR<Prisma.TestCaseCreateWithoutModuleInput, Prisma.TestCaseUncheckedCreateWithoutModuleInput>;
};
export type TestCaseUpdateWithWhereUniqueWithoutModuleInput = {
    where: Prisma.TestCaseWhereUniqueInput;
    data: Prisma.XOR<Prisma.TestCaseUpdateWithoutModuleInput, Prisma.TestCaseUncheckedUpdateWithoutModuleInput>;
};
export type TestCaseUpdateManyWithWhereWithoutModuleInput = {
    where: Prisma.TestCaseScalarWhereInput;
    data: Prisma.XOR<Prisma.TestCaseUpdateManyMutationInput, Prisma.TestCaseUncheckedUpdateManyWithoutModuleInput>;
};
export type TestCaseScalarWhereInput = {
    AND?: Prisma.TestCaseScalarWhereInput | Prisma.TestCaseScalarWhereInput[];
    OR?: Prisma.TestCaseScalarWhereInput[];
    NOT?: Prisma.TestCaseScalarWhereInput | Prisma.TestCaseScalarWhereInput[];
    id?: Prisma.StringFilter<"TestCase"> | string;
    title?: Prisma.StringFilter<"TestCase"> | string;
    moduleId?: Prisma.StringFilter<"TestCase"> | string;
    priority?: Prisma.EnumPriorityFilter<"TestCase"> | $Enums.Priority;
    createdAt?: Prisma.DateTimeFilter<"TestCase"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TestCase"> | Date | string;
};
export type TestCaseCreateWithoutTestResultsInput = {
    id?: string;
    title: string;
    priority?: $Enums.Priority;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    module: Prisma.ModuleCreateNestedOneWithoutTestCasesInput;
};
export type TestCaseUncheckedCreateWithoutTestResultsInput = {
    id?: string;
    title: string;
    moduleId: string;
    priority?: $Enums.Priority;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TestCaseCreateOrConnectWithoutTestResultsInput = {
    where: Prisma.TestCaseWhereUniqueInput;
    create: Prisma.XOR<Prisma.TestCaseCreateWithoutTestResultsInput, Prisma.TestCaseUncheckedCreateWithoutTestResultsInput>;
};
export type TestCaseUpsertWithoutTestResultsInput = {
    update: Prisma.XOR<Prisma.TestCaseUpdateWithoutTestResultsInput, Prisma.TestCaseUncheckedUpdateWithoutTestResultsInput>;
    create: Prisma.XOR<Prisma.TestCaseCreateWithoutTestResultsInput, Prisma.TestCaseUncheckedCreateWithoutTestResultsInput>;
    where?: Prisma.TestCaseWhereInput;
};
export type TestCaseUpdateToOneWithWhereWithoutTestResultsInput = {
    where?: Prisma.TestCaseWhereInput;
    data: Prisma.XOR<Prisma.TestCaseUpdateWithoutTestResultsInput, Prisma.TestCaseUncheckedUpdateWithoutTestResultsInput>;
};
export type TestCaseUpdateWithoutTestResultsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.EnumPriorityFieldUpdateOperationsInput | $Enums.Priority;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    module?: Prisma.ModuleUpdateOneRequiredWithoutTestCasesNestedInput;
};
export type TestCaseUncheckedUpdateWithoutTestResultsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleId?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.EnumPriorityFieldUpdateOperationsInput | $Enums.Priority;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TestCaseCreateManyModuleInput = {
    id?: string;
    title: string;
    priority?: $Enums.Priority;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TestCaseUpdateWithoutModuleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.EnumPriorityFieldUpdateOperationsInput | $Enums.Priority;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    testResults?: Prisma.TestResultUpdateManyWithoutTestCaseNestedInput;
};
export type TestCaseUncheckedUpdateWithoutModuleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.EnumPriorityFieldUpdateOperationsInput | $Enums.Priority;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    testResults?: Prisma.TestResultUncheckedUpdateManyWithoutTestCaseNestedInput;
};
export type TestCaseUncheckedUpdateManyWithoutModuleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.EnumPriorityFieldUpdateOperationsInput | $Enums.Priority;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TestCaseCountOutputType = {
    testResults: number;
};
export type TestCaseCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    testResults?: boolean | TestCaseCountOutputTypeCountTestResultsArgs;
};
export type TestCaseCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestCaseCountOutputTypeSelect<ExtArgs> | null;
};
export type TestCaseCountOutputTypeCountTestResultsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TestResultWhereInput;
};
export type TestCaseSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    moduleId?: boolean;
    priority?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    module?: boolean | Prisma.ModuleDefaultArgs<ExtArgs>;
    testResults?: boolean | Prisma.TestCase$testResultsArgs<ExtArgs>;
    _count?: boolean | Prisma.TestCaseCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["testCase"]>;
export type TestCaseSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    moduleId?: boolean;
    priority?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    module?: boolean | Prisma.ModuleDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["testCase"]>;
export type TestCaseSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    moduleId?: boolean;
    priority?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    module?: boolean | Prisma.ModuleDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["testCase"]>;
export type TestCaseSelectScalar = {
    id?: boolean;
    title?: boolean;
    moduleId?: boolean;
    priority?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type TestCaseOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "moduleId" | "priority" | "createdAt" | "updatedAt", ExtArgs["result"]["testCase"]>;
export type TestCaseInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    module?: boolean | Prisma.ModuleDefaultArgs<ExtArgs>;
    testResults?: boolean | Prisma.TestCase$testResultsArgs<ExtArgs>;
    _count?: boolean | Prisma.TestCaseCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TestCaseIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    module?: boolean | Prisma.ModuleDefaultArgs<ExtArgs>;
};
export type TestCaseIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    module?: boolean | Prisma.ModuleDefaultArgs<ExtArgs>;
};
export type $TestCasePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TestCase";
    objects: {
        module: Prisma.$ModulePayload<ExtArgs>;
        testResults: Prisma.$TestResultPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string;
        moduleId: string;
        priority: $Enums.Priority;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["testCase"]>;
    composites: {};
};
export type TestCaseGetPayload<S extends boolean | null | undefined | TestCaseDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TestCasePayload, S>;
export type TestCaseCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TestCaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TestCaseCountAggregateInputType | true;
};
export interface TestCaseDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TestCase'];
        meta: {
            name: 'TestCase';
        };
    };
    findUnique<T extends TestCaseFindUniqueArgs>(args: Prisma.SelectSubset<T, TestCaseFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TestCaseClient<runtime.Types.Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TestCaseFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TestCaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TestCaseClient<runtime.Types.Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TestCaseFindFirstArgs>(args?: Prisma.SelectSubset<T, TestCaseFindFirstArgs<ExtArgs>>): Prisma.Prisma__TestCaseClient<runtime.Types.Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TestCaseFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TestCaseFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TestCaseClient<runtime.Types.Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TestCaseFindManyArgs>(args?: Prisma.SelectSubset<T, TestCaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TestCaseCreateArgs>(args: Prisma.SelectSubset<T, TestCaseCreateArgs<ExtArgs>>): Prisma.Prisma__TestCaseClient<runtime.Types.Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TestCaseCreateManyArgs>(args?: Prisma.SelectSubset<T, TestCaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TestCaseCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TestCaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TestCaseDeleteArgs>(args: Prisma.SelectSubset<T, TestCaseDeleteArgs<ExtArgs>>): Prisma.Prisma__TestCaseClient<runtime.Types.Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TestCaseUpdateArgs>(args: Prisma.SelectSubset<T, TestCaseUpdateArgs<ExtArgs>>): Prisma.Prisma__TestCaseClient<runtime.Types.Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TestCaseDeleteManyArgs>(args?: Prisma.SelectSubset<T, TestCaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TestCaseUpdateManyArgs>(args: Prisma.SelectSubset<T, TestCaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TestCaseUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TestCaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TestCaseUpsertArgs>(args: Prisma.SelectSubset<T, TestCaseUpsertArgs<ExtArgs>>): Prisma.Prisma__TestCaseClient<runtime.Types.Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TestCaseCountArgs>(args?: Prisma.Subset<T, TestCaseCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TestCaseCountAggregateOutputType> : number>;
    aggregate<T extends TestCaseAggregateArgs>(args: Prisma.Subset<T, TestCaseAggregateArgs>): Prisma.PrismaPromise<GetTestCaseAggregateType<T>>;
    groupBy<T extends TestCaseGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TestCaseGroupByArgs['orderBy'];
    } : {
        orderBy?: TestCaseGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TestCaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestCaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TestCaseFieldRefs;
}
export interface Prisma__TestCaseClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    module<T extends Prisma.ModuleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ModuleDefaultArgs<ExtArgs>>): Prisma.Prisma__ModuleClient<runtime.Types.Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    testResults<T extends Prisma.TestCase$testResultsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TestCase$testResultsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TestCaseFieldRefs {
    readonly id: Prisma.FieldRef<"TestCase", 'String'>;
    readonly title: Prisma.FieldRef<"TestCase", 'String'>;
    readonly moduleId: Prisma.FieldRef<"TestCase", 'String'>;
    readonly priority: Prisma.FieldRef<"TestCase", 'Priority'>;
    readonly createdAt: Prisma.FieldRef<"TestCase", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"TestCase", 'DateTime'>;
}
export type TestCaseFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestCaseSelect<ExtArgs> | null;
    omit?: Prisma.TestCaseOmit<ExtArgs> | null;
    include?: Prisma.TestCaseInclude<ExtArgs> | null;
    where: Prisma.TestCaseWhereUniqueInput;
};
export type TestCaseFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestCaseSelect<ExtArgs> | null;
    omit?: Prisma.TestCaseOmit<ExtArgs> | null;
    include?: Prisma.TestCaseInclude<ExtArgs> | null;
    where: Prisma.TestCaseWhereUniqueInput;
};
export type TestCaseFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestCaseSelect<ExtArgs> | null;
    omit?: Prisma.TestCaseOmit<ExtArgs> | null;
    include?: Prisma.TestCaseInclude<ExtArgs> | null;
    where?: Prisma.TestCaseWhereInput;
    orderBy?: Prisma.TestCaseOrderByWithRelationInput | Prisma.TestCaseOrderByWithRelationInput[];
    cursor?: Prisma.TestCaseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TestCaseScalarFieldEnum | Prisma.TestCaseScalarFieldEnum[];
};
export type TestCaseFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestCaseSelect<ExtArgs> | null;
    omit?: Prisma.TestCaseOmit<ExtArgs> | null;
    include?: Prisma.TestCaseInclude<ExtArgs> | null;
    where?: Prisma.TestCaseWhereInput;
    orderBy?: Prisma.TestCaseOrderByWithRelationInput | Prisma.TestCaseOrderByWithRelationInput[];
    cursor?: Prisma.TestCaseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TestCaseScalarFieldEnum | Prisma.TestCaseScalarFieldEnum[];
};
export type TestCaseFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestCaseSelect<ExtArgs> | null;
    omit?: Prisma.TestCaseOmit<ExtArgs> | null;
    include?: Prisma.TestCaseInclude<ExtArgs> | null;
    where?: Prisma.TestCaseWhereInput;
    orderBy?: Prisma.TestCaseOrderByWithRelationInput | Prisma.TestCaseOrderByWithRelationInput[];
    cursor?: Prisma.TestCaseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TestCaseScalarFieldEnum | Prisma.TestCaseScalarFieldEnum[];
};
export type TestCaseCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestCaseSelect<ExtArgs> | null;
    omit?: Prisma.TestCaseOmit<ExtArgs> | null;
    include?: Prisma.TestCaseInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TestCaseCreateInput, Prisma.TestCaseUncheckedCreateInput>;
};
export type TestCaseCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TestCaseCreateManyInput | Prisma.TestCaseCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TestCaseCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestCaseSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TestCaseOmit<ExtArgs> | null;
    data: Prisma.TestCaseCreateManyInput | Prisma.TestCaseCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TestCaseIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TestCaseUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestCaseSelect<ExtArgs> | null;
    omit?: Prisma.TestCaseOmit<ExtArgs> | null;
    include?: Prisma.TestCaseInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TestCaseUpdateInput, Prisma.TestCaseUncheckedUpdateInput>;
    where: Prisma.TestCaseWhereUniqueInput;
};
export type TestCaseUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TestCaseUpdateManyMutationInput, Prisma.TestCaseUncheckedUpdateManyInput>;
    where?: Prisma.TestCaseWhereInput;
    limit?: number;
};
export type TestCaseUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestCaseSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TestCaseOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TestCaseUpdateManyMutationInput, Prisma.TestCaseUncheckedUpdateManyInput>;
    where?: Prisma.TestCaseWhereInput;
    limit?: number;
    include?: Prisma.TestCaseIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TestCaseUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestCaseSelect<ExtArgs> | null;
    omit?: Prisma.TestCaseOmit<ExtArgs> | null;
    include?: Prisma.TestCaseInclude<ExtArgs> | null;
    where: Prisma.TestCaseWhereUniqueInput;
    create: Prisma.XOR<Prisma.TestCaseCreateInput, Prisma.TestCaseUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TestCaseUpdateInput, Prisma.TestCaseUncheckedUpdateInput>;
};
export type TestCaseDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestCaseSelect<ExtArgs> | null;
    omit?: Prisma.TestCaseOmit<ExtArgs> | null;
    include?: Prisma.TestCaseInclude<ExtArgs> | null;
    where: Prisma.TestCaseWhereUniqueInput;
};
export type TestCaseDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TestCaseWhereInput;
    limit?: number;
};
export type TestCase$testResultsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TestCaseDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestCaseSelect<ExtArgs> | null;
    omit?: Prisma.TestCaseOmit<ExtArgs> | null;
    include?: Prisma.TestCaseInclude<ExtArgs> | null;
};
