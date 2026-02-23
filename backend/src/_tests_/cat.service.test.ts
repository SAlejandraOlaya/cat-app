import { getAllBreeds, getBreedById, searchBreeds } from "../services/cat.service";
import { httpClient } from "../config/http.client";

jest.mock("../config/http.client");

describe("Cat Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of breeds", async () => {
    const mockBreeds = [
      { id: "abys", name: "Abyssinian" },
      { id: "beng", name: "Bengal" },
    ];
    (httpClient.get as jest.Mock).mockResolvedValue({ data: mockBreeds });

    const result = await getAllBreeds();

    expect(result).toEqual(mockBreeds);
    expect(httpClient.get).toHaveBeenCalledWith("/breeds");
    expect(httpClient.get).toHaveBeenCalledTimes(1);
  });

  it("should return a breed by id", async () => {
    const mockBreed = { id: "abys", name: "Abyssinian" };
    (httpClient.get as jest.Mock).mockResolvedValue({ data: mockBreed });

    const result = await getBreedById("abys");

    expect(result).toEqual(mockBreed);
    expect(httpClient.get).toHaveBeenCalledWith("/breeds/abys");
    expect(httpClient.get).toHaveBeenCalledTimes(1);
  });

  it("should return breeds matching a search query", async () => {
    const mockBreeds = [{ id: "beng", name: "Bengal" }];
    (httpClient.get as jest.Mock).mockResolvedValue({ data: mockBreeds });

    const result = await searchBreeds("beng");

    expect(result).toEqual(mockBreeds);
    expect(httpClient.get).toHaveBeenCalledWith("/breeds/search", {
      params: { q: "beng" },
    });
    expect(httpClient.get).toHaveBeenCalledTimes(1);
  });
});
