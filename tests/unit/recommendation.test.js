import * as recommendationService from  "../../src/services/recommendationService.js";
import * as recommendationRepository from "../../src/repository/recommendationRepository.js";

const sut = recommendationService;

const mockRepository = {
    createRecommendation: () => jest.spyOn(recommendationRepository, 'createRecommendation'),
    checkForExistentRec: () => jest.spyOn(recommendationRepository, 'checkForExistentRec'),
    addPoint: () => jest.spyOn(recommendationRepository, 'addPoint'),
    dropPoint: () => jest.spyOn(recommendationRepository, 'dropPoint'),
    getRandomRec: () => jest.spyOn(recommendationRepository, 'getRandomRec'),
    getTopRec: () => jest.spyOn(recommendationRepository,'getTopRec'),
};


describe('Post tests for recommendations', () => {
    beforeEach(() => {
        mockRepository.createRecommendation().mockReset();
        mockRepository.checkForExistentRec().mockReset();
        mockRepository.addPoint().mockReset();
        mockRepository.dropPoint().mockReset();
        mockRepository.getRandomRec().mockReset();
        mockRepository.getTopRec().mockReset();
    });

    it('Return correct body for valid recommendation', async () =>{
        const body = {
            id: 1,
            name: 'test name',
            ytbLink: 'test link',
            points: 0,
        };
        mockRepository.createRecommendation().mockImplementationOnce(() => body);
        const result = await sut.registerRecInDB({name: 'test name', youtubeLink:'test link'})
        expect(result).toEqual(body);

    })

    it('Return correct body for valid Upvote', async () =>{
        const body = {
            id: 1,
            name: 'test Song',
            youtubeLink: 'test Link',
            score: 1,
        };
        mockRepository.checkForExistentRec().mockImplementationOnce(() => true);
        mockRepository.addPoint().mockImplementationOnce(()=> body);
        const result = await sut.sendUpVote({ id: 1 });
        expect(result).toEqual(body);
    })

    it('Return undefined for invalid Upvote id', async () =>{
        mockRepository.checkForExistentRec().mockImplementationOnce(() => false);
        const result = await sut.sendUpVote({id: 1});
        expect(result).toBeUndefined();
    })


    
    it('Return correct body for valid Downvote', async () =>{
        const body = {
            id: 1,
            name: 'test Song',
            youtubeLink: 'test Link',
            score: 1,
        };
        mockRepository.checkForExistentRec().mockImplementationOnce(() => true);
        mockRepository.dropPoint().mockImplementationOnce(()=> body);
        const result = await sut.dropUpVote({ id: 1 });
        expect(result).toEqual(body);
    })

    it('Return undefined for invalid Upvote id', async () =>{
        mockRepository.checkForExistentRec().mockImplementationOnce(() => false);
        const result = await sut.dropUpVote({id: 1});
        expect(result).toBeUndefined();
    })
});

