// @flow

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  sections: [
    {
      title: 'Data',
      shouldDisplay: authUser => authUser.isPurchaserOfAnyOffice() || authUser.isAdminOfAnyOffice(),
      items: [
        {
          name: 'Dashboard',
          icon: 'cm-icon-h-dashboard',
          iconColor: '#4e9d09',
          link: '/dashboard',
          featureKey: 'dashboard',
          shouldDisplay: authUser =>
            authUser.isPurchaserOfAnyOffice() || authUser.isAdminOfAnyOffice(),
          isActive: locationPathname => locationPathname?.toLowerCase()?.includes('/dashboard'),
        },
        {
          name: 'Data Explorer',
          icon: 'cm-icon-report',
          iconColor: '#ff884d',
          link: '/explorer',
          ldFlags: ['reportingModule'],
          featureKey: 'data_explorer',
          shouldDisplay: authUser =>
            authUser.isPurchaserOfAnyOffice() || authUser.isAdminOfAnyOffice(),
          isActive: locationPathname => locationPathname?.toLowerCase()?.includes('/explorer'),
        },
      ],
    },
  ],
}
