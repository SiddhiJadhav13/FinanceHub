import { Grid, GridItem, Skeleton, Stack } from '@chakra-ui/react'
import AlertsInsights from '../components/AlertsInsights'
import BudgetProgress from '../components/BudgetProgress'
import Charts from '../components/Charts'
import FinancialHealth from '../components/FinancialHealth'
import Insights from '../components/Insights'
import Layout from '../components/Layout'
import QuickActions from '../components/QuickActions'
import RecentTransactions from '../components/RecentTransactions'
import SummaryCards from '../components/SummaryCards'
import TopCategories from '../components/TopCategories'
import TransactionsSection from '../components/TransactionsSection'
import UpcomingPayments from '../components/UpcomingPayments'
import { useApp } from '../context/AppContext'

const Dashboard = () => {
  const { isLoading, navSection } = useApp()

  return (
    <Layout>
      {isLoading ? (
        <Stack spacing={4}>
          <Skeleton height="140px" borderRadius="2xl" />
          <Skeleton height="320px" borderRadius="2xl" />
          <Skeleton height="260px" borderRadius="2xl" />
        </Stack>
      ) : (
        <Stack spacing={6}>
          {navSection === 'Dashboard' && (
            <Stack spacing={6}>
              <SummaryCards />
              <Grid templateColumns={{ base: '1fr', lg: '1.1fr 0.9fr' }} gap={6}>
                <GridItem>
                  <QuickActions />
                </GridItem>
                <GridItem>
                  <FinancialHealth />
                </GridItem>
              </Grid>
              <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6}>
                <GridItem>
                  <BudgetProgress />
                </GridItem>
                <GridItem>
                  <TopCategories />
                </GridItem>
              </Grid>
              <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6}>
                <GridItem>
                  <AlertsInsights />
                </GridItem>
                <GridItem>
                  <UpcomingPayments />
                </GridItem>
              </Grid>
              <RecentTransactions />
            </Stack>
          )}
          {navSection === 'Analytics' && (
            <Grid
              templateColumns={{ base: '1fr', xl: '1.7fr 1fr' }}
              gap={6}
            >
              <GridItem>
                <Charts />
              </GridItem>
              <GridItem>
                <Insights />
              </GridItem>
            </Grid>
          )}
          {navSection === 'Transactions' && <TransactionsSection />}
        </Stack>
      )}
    </Layout>
  )
}

export default Dashboard
