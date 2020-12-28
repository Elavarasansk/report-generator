const FILTER_DYNAMIC_VALUE = {
    FULLDAY: " $fullday$ ",
    SPECIFIC_DATE: " $specific_date$ ",
    SPECIFIC_MONTH: " $specific_month$ ",
    SPECIFIC_YEAR: " $specific_year$ ",
    START_RANGE: " $start_range$ ",
    END_RANGE: " $end_range$ ",
    BOOL_FLAG: " $bool_flag$ ",
    USER_LIST: " $user_list$ ",
    PROJECT_LIST: " $project_list$ ",
}

const LEAVE_REQUEST_FRAGMENT_STATISTICS = {
    SELECT: {
        "LEAVE_FRAGMENTS": ` sum(lrf.noOfDays) as totalAbsentDays, count(distinct(lrf.fragmentDate)) as totalUniqueDays `,
        "EMP_INFO": ` count(distinct(kemp.id)) as totalApplicants `,
        "GROUPING_STATS": "group_concat(lr.type) as groupedType, group_concat(lr.status) as groupedStatus",
        "GROUPING_STATS": "group_concat(pr.id)  as groupedProj, group_concat(od.id) as groupedOrgDiv, group_concat(og.id) as groupedOrganisation"
    },
    FROM: ` FROM leave_request_fragments as lrf `,
    INNER_JOIN: {
        "LEAVE_REQUEST": ` INNER join leave_request as lr ON lrf.leave_request_id =  lr.id `,
        "USER_MATCH": ` INNER join kairo_user as kemp ON kemp.id= lr.applicant_id `,
        "PROJECT_ALLOC_MATCH": ` INNER join project_allocation as pa ON pa.id= lr.project_allocation_id `,
        "REPORT_MATCH": ` INNER join kairo_user as krep ON pa.report_to = krep.id `,
        "PROJECT_MATCH": ` INNER join project as pr ON pr.id= lr.project_id
         INNER join organisation_division as od ON od.id=pr.organisation_division_id
         INNER join organisation as og ON og.id= od.organisation_id `,
    },
    MANDATORY_FILTER_KEY: {
        "project_allocation_id": "lr.project_allocation_id"
    },
    FILTER_KEY: {
        FULLDAY: ` lrf.isFullday = ${FILTER_DYNAMIC_VALUE.FULLDAY} `,
        UTILIZED_LEAVES: ` lrf.isUtilizationUpdated= ${FILTER_DYNAMIC_VALUE.BOOL_FLAG} `,

        SPECIFIC_YEAR: ` lrf.year = '${FILTER_DYNAMIC_VALUE.SPECIFIC_YEAR}' `,
        SPECIFIC_DATE: ` lrf.fragmentDate = '${FILTER_DYNAMIC_VALUE.SPECIFIC_DATE}' `,
        SPECIFIC_MONTH: ` lrf.month = '${FILTER_DYNAMIC_VALUE.SPECIFIC_MONTH}' and lrf.year=${FILTER_DYNAMIC_VALUE.SPECIFIC_YEAR} `,
        DATE_RANGE: ` lrf.fragmentDate >= '${FILTER_DYNAMIC_VALUE.START_RANGE}' and lrf.fragmentDate<= '${FILTER_DYNAMIC_VALUE.END_RANGE}' `,

        PROJECTS_IN: ` lr.project_id in (${FILTER_DYNAMIC_VALUE.PROJECT_LIST}) `,
    },
    GROUP_KEY: {
        LR: {
            "status": "lr.status",
            "leaveType": "lr.type",
            "applicant_id": "lr.applicant_id",
        },
        LRF: {
            "year": "lrf.year",
            "month": "lrf.month",
            "date": "lrf.fragmentDate"
        },
        ORG: {
            "project": "pr.id",
            "division": "od.id",
            "organisation": "og.id"
        }
    }
}

const REDMINE_CONSOLIIDATED_LOG_STATISTICS = {
    SELECT: {
        "REDMINE_LOG": ` sum(rcl.loggedHours) as totalLoggedHours, count(distinct(rcl.spentOn)) as totalUniqueDays `,
        "EMP_INFO": ` count(distinct(kemp.id)) as totalApplicants `,
        "GROUPING_STATS": "group_concat(lr.type) as groupedType, group_concat(lr.status) as groupedStatus",
        "GROUPING_STATS": "group_concat(pr.id)  as groupedProj, group_concat(od.id) as groupedOrgDiv, group_concat(og.id) as groupedOrganisation"
    },
    FROM: ` FROM redmine_consolidated_logdetails as rcl `,
    INNER_JOIN: {
        "USER_MATCH": ` INNER join kairo_user as kemp ON kemp.id= rcl.kairo_user_id `,
        "PROJECT_ALLOC_MATCH": ` INNER join project_allocation as pa ON pa.id= rcl.project_allocation_id `,
        "REPORT_MATCH": ` INNER join kairo_user as krep ON pa.report_to = krep.id `,
        "PROJECT_MATCH": ` INNER join project as pr ON pr.id= lr.project_id
         INNER join organisation_division as od ON od.id=pr.organisation_division_id
         INNER join organisation as og ON og.id= od.organisation_id `,
    },
    MANDATORY_FILTER_KEY: {
        "project_allocation_id": "rcl.project_allocation_id"
    },
    FILTER_KEY: {
        SPECIFIC_YEAR: ` rcl.year = '${FILTER_DYNAMIC_VALUE.SPECIFIC_YEAR}' `,
        SPECIFIC_DATE: ` rcl.spentOn = '${FILTER_DYNAMIC_VALUE.SPECIFIC_DATE}' `,
        SPECIFIC_MONTH: ` rcl.month = '${FILTER_DYNAMIC_VALUE.SPECIFIC_MONTH}' and rcl.year=${FILTER_DYNAMIC_VALUE.SPECIFIC_YEAR} `,
        DATE_RANGE: ` rcl.spentOn >= '${FILTER_DYNAMIC_VALUE.START_RANGE}' and rcl.spentOn<= '${FILTER_DYNAMIC_VALUE.END_RANGE}' `,
        PROJECTS_IN: ` rcl.kairo_project_id in (${FILTER_DYNAMIC_VALUE.PROJECT_LIST}) `,
    },
    GROUP_KEY: {
        LR: {
            "status": "lr.status",
            "leaveType": "lr.type",
            "applicant_id": "lr.applicant_id"
        },
        LRF: {
            "year": "lrf.year",
            "month": "lrf.month",
            "date": "lrf.fragmentDate"
        },
        ORG: {
            "project": "pr.id",
            "division": "od.id",
            "organisation": "og.id"
        }
    }
}


module.exports = {
    LEAVE_REQUEST_FRAGMENT_STATISTICS,
    REDMINE_CONSOLIIDATED_LOG_STATISTICS
}