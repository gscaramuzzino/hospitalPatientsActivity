describe("Unit: Controller Test", function () {
  var controller, PatientsSummaryService;

  beforeEach(module("ngRoute"));

  beforeEach(module("AppModule"), function($provide) {
    $provide.value('PatientsSummaryService', {
      getActivities: function () {},
      getDataPatient: function() {}
    });
  });

  var $controller;
  beforeEach(inject(function (_$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  var PatientsSummaryController,
    scope, $q, deferred;
  // Initialize the controller and a mock scope
  // spy the service to simulate the promise
  beforeEach(inject(function ($controller, $rootScope, _$q_, PatientsService) {
    scope = $rootScope.$new();
    scope = $rootScope.$new();
    $q = _$q_;
    // We use the $q service to create a mock instance of defer
    deferred = _$q_.defer();
    // Use a Jasmine Spy to return the deferred promise
    spyOn(PatientsSummaryService, 'getActivities').and.returnValue(deferred.promise);
    spyOn(PatientsSummaryService, 'getDataPatient').and.returnValue(deferred.promise);


    PatientsSummaryController = $controller('PatientsSummaryController', {
    });

  }));

  describe('Controller: PatientsSummaryController', function () {
      // finally, why start the test
      it('PatientsSummaryController should not be null', inject(function ($controller) {
        expect(PatientsSummaryController).not.toBeNull();
      }));

      it('patient should not be null', inject(function ($controller) {
        expect(PatientsSummaryController.patient).not.toBeNull();
      }));

      it('patientActivity should be null', inject(function ($controller) {
        expect(PatientsSummaryController.patientActivity).toBeNull();
      }));

      it('definitionActivity should be null', inject(function ($controller) {
        expect(PatientsSummaryController.definitionActivity).toBeNull();
      }));

      it('should resolve promise, definitionActivity should not be null', function () {
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({
          "data": [
            {
              "activity": "sleeping",
              "intensity": "none"
            },
            {
              "activity": "stationary-awake",
              "intensity": "low"
            },
            {
              "activity": "walking",
              "intensity": "moderate"
            },
            {
              "activity": "cycling",
              "intensity": "moderate"
            },
            {
              "activity": "swimming",
              "intensity": "vigorous"
            },
            {
              "activity": "running",
              "intensity": "vigorous"
            }
          ]
        });
        // We have to call apply for this to work
        scope.$apply();
        // Since we called apply, not we can perform our assertions
        expect(PatientsSummaryController.definitionActivity).not.toBeNull();
      });
      
      it('should resolve promise, patientActivity should not be null', function () {
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({
          "data": [
            {
              "activity": "sleeping",
              "minutes": 540
            },
            {
              "activity": "walking",
              "minutes": 75
            },
            {
              "activity": "stationary-awake",
              "minutes": 765
            },
            {
              "activity": "swimming",
              "minutes": 60
            }
          ]

        });
        // We have to call apply for this to work
        scope.$apply();
        // Since we called apply, not we can perform our assertions
        expect(PatientsSummaryController.patientActivity).not.toBeNull();
      });

       it('image path should be male_1.png', inject(function ($controller) {
        var patient = {
          "id": 1,
          "name": "Gregor van Vloten",
          "gender": "male",
          "birthDate": "1986-05-09",
          "heightCm": 193,
          "weightKg": 69.6,
          "bmi": 18.6
         };
        var image = PatientsSummaryController.getPatientImage(patient, 1);
        expect(image).toEqual("images/male_1.png");
      }));

      it('showActivityDefintion should be true', inject(function ($controller) {
        PatientsSummaryController.actionOnActivityDefinition();
        scope.$apply();
        expect(PatientsSummaryController.showActivityDefintion).toBeTruthy();
      }));

  });

});